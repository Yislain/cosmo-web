import React from 'react';

interface GameScreenProps {
  username?: string;
  onLogout?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ username = 'Jugador', onLogout }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {onLogout && (
        <button
          onClick={onLogout}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            zIndex: 10,
            padding: '10px 18px',
            backgroundColor: '#ff4d4d',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cerrar Sesión
        </button>
      )}
      {/* El iframe ahora envía el username por la URL */}
      <iframe
        src={`/cosmo1.html?username=${encodeURIComponent(username)}`}
        title="Cosmo Web Game"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};