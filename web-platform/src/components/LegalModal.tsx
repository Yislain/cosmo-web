import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, title, type }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-gray-800 border-2 border-gray-600 rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
        
        {/* Cabecera del Modal */}
        <div className="p-4 border-b border-gray-600 flex justify-between items-center bg-gray-900">
          <h3 className="text-xl font-bold text-blue-400 tracking-wide uppercase font-mono">
            {title}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white font-bold text-lg p-1 px-3 border border-gray-600 hover:border-white rounded bg-gray-700 transition-colors"
          >
            X
          </button>
        </div>

        {/* Contenido con Scroll Legal */}
        <div className="p-6 overflow-y-auto text-gray-300 space-y-4 text-sm leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-white">AVISO DE PRIVACIDAD INTEGRAL — PROYECTO COSMO</p>
              <p>En cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP)</strong>, se le informa que el tratamiento de sus datos se limitará estrictamente a los propósitos establecidos.</p>
              <h4 className="font-bold text-white mt-2">1. Finalidad del Tratamiento</h4>
              <p>Los datos recabados se utilizarán única y exclusivamente para la creación, autenticación y gestión de su cuenta de jugador, permitiendo almacenar de forma segura su progreso en el juego y procesar su puntuación en las tablas de clasificación generales.</p>
              <h4 className="font-bold text-white mt-2">2. Seguridad y Cifrado</h4>
              <p>Contamos con medidas de seguridad técnicas apropiadas. Toda transmisión de datos viaja bajo protocolos seguros cifrados y las credenciales de acceso se protegen mediante encriptación unidireccional.</p>
              <h4 className="font-bold text-white mt-2">3. Derechos ARCO</h4>
              <p>Usted mantiene el derecho de Acceder, Rectificar, Cancelar u Oponerse al manejo de su información. Podrá solicitar la baja total y eliminación definitiva de sus registros enviando una solicitud a soporte, la cual se procesará en un plazo máximo de 72 horas.</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-white">TÉRMINOS Y CONDICIONES DE USO</p>
              <p>Bienvenido al videojuego Cosmo. Al registrar una cuenta dentro de la plataforma web o móvil, usted acepta las condiciones descritas a continuación:</p>
              <h4 className="font-bold text-white mt-2">1. Registro y Uso de la Cuenta</h4>
              <p>El usuario se compromete a proporcionar un alias o nombre de jugador respetuoso. Queda prohibido el uso de nombres ofensivos o vulgares dentro de las tablas de líderes.</p>
              <h4 className="font-bold text-white mt-2">2. Propiedad Intelectual</h4>
              <p>Todo el código fuente, lógicas de juego lógicas, mecánicas y elementos visuales generados bajo el motor Godot pertenecen al proyecto técnico de los desarrolladores.</p>
              <h4 className="font-bold text-white mt-2">3. Modificaciones del Servicio</h4>
              <p>Nos reservamos el derecho de modificar mecánicas, balance de juego o reiniciar puntajes en caso de auditorías técnicas o de optimización de rendimiento en bases de datos.</p>
            </>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="p-4 border-t border-gray-600 flex justify-end bg-gray-900">
          <button 
            type="button"
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded uppercase tracking-wider text-xs font-mono transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}