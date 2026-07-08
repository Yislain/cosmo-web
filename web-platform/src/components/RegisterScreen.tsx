import React, { useState } from 'react';
import LegalModal from './LegalModal';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para las casillas de verificación obligatorias
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Estados para controlar la apertura de los modales flotantes
  const [modalConfig, setModalConfig] = useState<{ isOpen: boolean; title: string; type: 'privacy' | 'terms' }>({
    isOpen: false,
    title: '',
    type: 'privacy'
  });

  const openModal = (type: 'privacy' | 'terms') => {
    setModalConfig({
      isOpen: true,
      title: type === 'privacy' ? 'Aviso de Privacidad (LFPDPPP)' : 'Términos y Condiciones',
      type
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedPrivacy || !acceptedTerms) {
      alert("Para registrar tu jugador es obligatorio aceptar las políticas de privacidad y los términos de servicio.");
      return;
    }
    
    // Aquí se procesaría el consentimiento explícito hacia el backend
    console.log("Consentimiento otorgado por el usuario. Registrando jugador:", { username, email });
    alert("¡Registro exitoso en Cosmo! Bienvenido Player 1.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="bg-gray-900 border-2 border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-md">
        
        <header className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-wider text-blue-500 font-mono uppercase">
            Cosmo Web
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase font-mono">
            Registro de Nuevo Jugador
          </p>
        </header>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Username
            </label>
            <input 
              type="text" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="PLAYER_1"
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-600 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Email
            </label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-600 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Password
            </label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded bg-gray-800 border border-gray-600 text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            />
          </div>

          {/* SECCIÓN DE CUMPLIMIENTO LEGAL */}
          <div className="pt-2 space-y-4 text-xs text-gray-300 border-t border-gray-800">
            
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="privacyCheckbox" 
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-blue-500 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="privacyCheckbox" className="leading-normal cursor-pointer select-none">
                Otorgo mi consentimiento explícito para el tratamiento de mis datos personales conforme al{' '}
                <button 
                  type="button"
                  onClick={() => openModal('privacy')}
                  className="text-blue-400 underline hover:text-blue-300 font-medium inline"
                >
                  Aviso de Privacidad
                </button>.
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="termsCheckbox" 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-gray-800 checked:bg-blue-500 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="termsCheckbox" className="leading-normal cursor-pointer select-none">
                He leído y acepto incondicionalmente los{' '}
                <button 
                  type="button"
                  onClick={() => openModal('terms')}
                  className="text-blue-400 underline hover:text-blue-300 font-medium inline"
                >
                  Términos y Condiciones de Uso
                </button>{' '}
                de la plataforma web.
              </label>
            </div>

          </div>

          <button 
            type="submit" 
            disabled={!acceptedPrivacy || !acceptedTerms}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold font-mono py-3 px-4 rounded-md uppercase tracking-widest text-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          >
            Registrar Jugador
          </button>
        </form>

      </div>

      {/* Renderizado dinámico del Modal */}
      <LegalModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        type={modalConfig.type}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
}