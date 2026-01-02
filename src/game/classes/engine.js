import { Enemy } from './Enemy.js';

/**
 * Função principal do Loop do Jogo
 * @param {CanvasRenderingContext2D} ctx - Contexto do Canvas
 * @param {Player} player - Instância do Jogador
 * @param {Array} enemies - Lista de inimigos ativos
 * @param {Object} keys - Estado das teclas pressionadas
 * @param {Function} onScore - Callback para aumentar pontuação no React
 * @param {Function} onLoseLife - Callback para reduzir vidas no React
 */
export const gameLoop = (ctx, player, enemies, keys, onScore, onLoseLife) => {
  // 1. Limpar a tela para o novo frame
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // 2. Gerar Inimigos (Spawn) baseado em probabilidade
  if (Math.random() < 0.02) {
    enemies.push(new Enemy());
  }

  // 3. Atualizar e Desenhar o Jogador
  player.move(keys);
  player.draw(ctx);

  // 4. Processar Inimigos e Colisões
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw(ctx);

    // Colisão: Projéteis do Jogador vs Inimigo
    player.bullets.forEach((bullet) => {
      if (checkCollision(bullet, enemy)) {
        bullet.active = false; // Desativa o tiro
        enemy.active = false;  // Desativa o inimigo
        onScore(100);          // Notifica o React para subir o score
      }
    });

    // Colisão: Jogador vs Inimigo
    if (checkCollision(player, enemy)) {
      enemy.active = false;    // O inimigo explode ao bater em você
      onLoseLife();            // Notifica o React para tirar uma vida
    }
  });

  // 5. Limpeza de memória (Garbage Collection manual)
  // Filtra apenas inimigos que ainda estão na tela ou não foram destruídos
  const activeEnemies = enemies.filter(e => e.active);

  // 6. Agendar o próximo frame passando todas as referências atualizadas
  return requestAnimationFrame(() => 
    gameLoop(ctx, player, activeEnemies, keys, onScore, onLoseLife)
  );
};

/**
 * Detecção de Colisão AABB (Axis-Aligned Bounding Box)
 * Verifica se dois retângulos se sobrepõem
 */
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}