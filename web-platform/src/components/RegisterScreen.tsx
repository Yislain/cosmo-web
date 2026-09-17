import React, { useState, useEffect } from 'react';
import LegalModal from './LegalModal';

// Definimos las propiedades que recibe el componente desde App.tsx
interface RegisterScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function RegisterScreen({ onLoginSuccess }: RegisterScreenProps) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para las casillas de verificación obligatorias
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Estados de conexión con el backend
  const [isServerOnline, setIsServerOnline] = useState<boolean>(true);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(true);

  // Estados para controlar los modales legales
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string; type: 'privacy' | 'terms' }>({
    isOpen: false,
    title: '',
    type: 'privacy'
  });

  // Verificación constante del backend (ping cada 3 segundos)
  useEffect(() => {
    const checkServer = async () => {
      try {
        const controller = new AbortController();
        // Si el servidor no responde en 2 segundos, abortamos
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        // ACTUALIZADO A HTTPS
        const res = await fetch('https://cosmo-server.infinityfreeapp.com/login.php', {
          method: 'OPTIONS',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        setIsServerOnline(res.ok || res.status === 200);
      } catch {
        setIsServerOnline(false);
      } finally {
        setCheckingConnection(false);
      }
    };

    // Chequeo inicial
    checkServer();
    // Chequeo cíclico
    const interval = setInterval(checkServer, 3000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (type: 'privacy' | 'terms') => {
    setModalConfig({
      isOpen: true,
      title: type === 'privacy' ? 'Aviso de Privacidad (LFPDPPP)' : 'Términos y Condiciones',
      type
    });
  };

  const handleGuestLogin = () => {
    onLoginSuccess("Invitado");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Si no hay conexión, abortar envío
    if (!isServerOnline) return;

    if (!isLoginMode && (!acceptedPrivacy || !acceptedTerms)) {
      alert("Para registrar tu jugador es obligatorio aceptar las políticas de privacidad y los términos de servicio.");
      return;
    }
    
    try {
      const endpoint = isLoginMode ? 'login.php' : 'register.php';
      
      // ACTUALIZADO A HTTPS
      const API_URL = `https://cosmo-server.infinityfreeapp.com/${endpoint}`;
      
      const payload = isLoginMode 
        ? { username, password } 
        : { username, email, password };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.status === 'success') {
        if (isLoginMode) {
          onLoginSuccess(username);
        } else {
          alert("¡Registro exitoso en Cosmo! Ya puedes iniciar sesión.");
          setIsLoginMode(true);
          setPassword('');
          setAcceptedPrivacy(false);
          setAcceptedTerms(false);
        }
      } else {
        alert(`Error: ${data.message}`);
      }

    } catch (error) {
      console.error("Error conectando con el backend:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="bg-gray-900 border-2 border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-md transition-all">
        
        <header className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-wider text-blue-500 font-mono uppercase">
            Cosmo Web
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase font-mono">
            {isLoginMode ? 'Inicio de Sesión' : 'Registro de Nuevo Jugador'}
          </p>

          {/* Estado Visual de la conexión */}
          <div className="mt-3 text-xs font-mono font-bold">
            {checkingConnection ? (
              <span className="text-yellow-400">⚡ Verificando conexión...</span>
            ) : isServerOnline ? (
              <span className="text-green-400">● Servidor Online</span>
            ) : (
              <span className="text-red-400">● Sin red (Formulario bloqueado)</span>
            )}
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Username
            </label>
            <input 
              type="text" 
              required 
              disabled={!isServerOnline}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={isServerOnline ? "PLAYER_1" : "Servidor inaccesible"}
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-600 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:bg-gray-800 disabled:cursor-not-allowed transition-opacity" 
            />
          </div>
          
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Email
              </label>
              <input 
                type="email" 
                required 
                disabled={!isServerOnline}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isServerOnline ? "correo@ejemplo.com" : "Servidor inaccesible"}
                className="w-full p-2.5 rounded bg-gray-800 border border-gray-600 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:bg-gray-800 disabled:cursor-not-allowed transition-opacity" 
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Password
            </label>
            <input 
              type="password" 
              required 
              disabled={!isServerOnline}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-600 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:bg-gray-800 disabled:cursor-not-allowed transition-opacity" 
            />
          </div>

          {!isLoginMode && (
            <div className="pt-2 space-y-4 text-xs text-gray-300 border-t border-gray-800">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="privacyCheckbox" 
                  disabled={!isServerOnline}
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-blue-500 focus:ring-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <label htmlFor="privacyCheckbox" className={`leading-normal select-none transition-opacity ${!isServerOnline ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                  Otorgo mi consentimiento explícito para el tratamiento de mis datos personales conforme al{' '}
                  <button 
                    type="button"
                    disabled={!isServerOnline}
                    onClick={() => openModal('privacy')}
                    className="text-blue-400 underline hover:text-blue-300 font-medium inline disabled:cursor-not-allowed"
                  >
                    Aviso de Privacidad
                  </button>.
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="termsCheckbox" 
                  disabled={!isServerOnline}
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-blue-500 focus:ring-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <label htmlFor="termsCheckbox" className={`leading-normal select-none transition-opacity ${!isServerOnline ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                  He leído y acepto incondicionalmente los{' '}
                  <button 
                    type="button"
                    disabled={!isServerOnline}
                    onClick={() => openModal('terms')}
                    className="text-blue-400 underline hover:text-blue-300 font-medium inline disabled:cursor-not-allowed"
                  >
                    Términos y Condiciones de Uso
                  </button>{' '}
                  de la plataforma web.
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <button 
              type="submit" 
              disabled={!isServerOnline || (!isLoginMode && (!acceptedPrivacy || !acceptedTerms))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono py-3 px-4 rounded-md uppercase tracking-widest text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
            >
              {isLoginMode ? 'Iniciar Sesión' : 'Registrar Jugador'}
            </button>

            <button 
              type="button" 
              onClick={handleGuestLogin}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold font-mono py-3 px-4 rounded-md uppercase tracking-widest text-xs transition-all shadow-md border border-gray-600 cursor-pointer"
            >
              Jugar como Invitado
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          {isLoginMode ? "¿No tienes cuenta? " : "¿Ya tienes una cuenta? "}
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)}
            disabled={!isServerOnline}
            className="text-blue-500 hover:text-blue-400 font-bold underline disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoginMode ? "Regístrate aquí" : "Inicia sesión aquí"}
          </button>
        </div>

      </div>

      <LegalModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        type={modalConfig.type}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}