import { ENEMY_CONFIG, CANVAS_WIDTH, CANVAS_HEIGHT } from './constants.js';

export class Enemy {
  constructor() {
    this.width = ENEMY_CONFIG.WIDTH;
    this.height = ENEMY_CONFIG.HEIGHT;
    // Posição X aleatória dentro da largura do canvas
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = -this.height; // Começa fora da tela (no topo)
    this.active = true;
  }

  update() {
    this.y += ENEMY_CONFIG.SPEED;
    // Se passar do fundo da tela, desativa
    if (this.y > CANVAS_HEIGHT) {
      this.active = false;
    }
  }

  draw(ctx) {
    ctx.fillStyle = ENEMY_CONFIG.COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}