import { useEffect, useRef, useState } from 'react';
import { Player } from './game/classes/Player.js';
import { gameLoop } from './game/classes/engine.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './game/classes/constants.js';

function App() {
  const canvasRef = useRef(null);
  const keys = useRef({}); 
  const enemies = useRef([]); 
  
  // Estados do jogo
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const player = new Player();

    // Funções de atualização de estado
    const addScore = (points) => setScore(prev => prev + points);
    const removeLife = () => setLives(prev => Math.max(0, prev - 1));

    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
      if (e.code === 'Space' && lives > 0) {
        player.shoot();
      }
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Inicia o Loop passando addScore e removeLife
    let animationId;
    if (lives > 0) {
      animationId = gameLoop(ctx, player, enemies.current, keys.current, addScore, removeLife);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [lives === 0]); // Reinicia ou para o efeito se as vidas acabarem

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: '#0a0a0a',
      color: 'white',
      fontFamily: 'Orbitron, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* HUD: Vidas */}
      <div style={{ 
        position: 'absolute', 
        top: '30px', 
        left: '40px', 
        fontSize: '24px', 
        color: '#FF4444' 
      }}>
        LIVES: {'❤️'.repeat(lives)}
      </div>

      {/* HUD: Pontuação */}
      <div style={{ 
        position: 'absolute', 
        top: '30px', 
        right: '40px', 
        fontSize: '24px', 
        color: '#00FF00'
      }}>
        SCORE: {score.toString().padStart(5, '0')}
      </div>

      <h1 style={{ marginBottom: '5px', color: '#3c703cff', letterSpacing: '2px' }}>
        SPACE DEFENDER DA 
        LIBRA NEGONA
      </h1>
      
      <div style={{ marginBottom: '15px', textAlign: 'center', opacity: 0.8 }}>
        <p style={{ margin: '5px' }}>🎮 Movimento: <strong>W, A, S, D</strong> | 🚀 Atirar: <strong>Espaço</strong></p>
      </div>

      {/* Tela de Game Over sobreposta ao Canvas */}
      {lives === 0 && (
        <div style={{
          position: 'absolute',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.8)',
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid red',
          zIndex: 10
        }}>
          <h2 style={{ color: 'red', fontSize: '40px', margin: 0 }}>GAME OVER</h2>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '10px', 
              padding: '10px 20px', 
              cursor: 'pointer',
              background: '#00FF00',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            RECOMEÇAR
          </button>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ 
          border: '4px solid #222', 
          backgroundColor: '#000',
          boxShadow: lives === 0 ? '0 0 50px rgba(255, 0, 0, 0.3)' : '0 0 50px rgba(0, 255, 0, 0.1)',
          borderRadius: '4px'
        }}
      />
    </div>
  );
}

export default App;