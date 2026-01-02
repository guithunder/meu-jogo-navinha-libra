// Alterado de '../constants' para './constants.js'
import { PLAYER_CONFIG, CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';
// Recomendado adicionar .js para evitar erros no Vite
import { Bullet } from './Bullet.js';

export class Player {
  constructor() {
    this.width = PLAYER_CONFIG.WIDTH;
    this.height = PLAYER_CONFIG.HEIGHT;
    this.x = CANVAS_WIDTH / 2 - this.width / 2;
    this.y = CANVAS_HEIGHT - 100; 
    this.bullets = [];
  }

  draw(ctx) {
    // Desenha os tiros
    this.bullets.forEach(bullet => bullet.draw(ctx));

    // Desenha a nave (triângulo)
    ctx.fillStyle = PLAYER_CONFIG.COLOR;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();
  }

  move(keys) {
    // Movimento Horizontal (A e D)
    if ((keys['a'] || keys['A']) && this.x > 0) {
      this.x -= PLAYER_CONFIG.SPEED;
    }
    if ((keys['d'] || keys['D']) && this.x < CANVAS_WIDTH - this.width) {
      this.x += PLAYER_CONFIG.SPEED;
    }

    // Movimento Vertical (W e S)
    if ((keys['w'] || keys['W']) && this.y > 0) {
      this.y -= PLAYER_CONFIG.SPEED;
    }
    if ((keys['s'] || keys['S']) && this.y < CANVAS_HEIGHT - this.height) {
      this.y += PLAYER_CONFIG.SPEED;
    }
    
    // Atualiza tiros
    this.bullets.forEach(bullet => bullet.update());
    this.bullets = this.bullets.filter(bullet => bullet.active);
  }

  shoot() {
    // Centraliza o tiro no topo da nave
    const bulletX = this.x + this.width / 2 - 2;
    const bulletY = this.y;
    this.bullets.push(new Bullet(bulletX, bulletY));
  }
}