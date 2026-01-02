import { BULLET_CONFIG } from './constants.js';

export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 15;
    this.speed = BULLET_CONFIG.SPEED;
    this.active = true; // Quando false, o jogo remove o tiro da memória
  }

  draw(ctx) {
    ctx.fillStyle = BULLET_CONFIG.COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y -= this.speed; // O tiro sobe
    // Se sair da tela, desativa para economizar memória
    if (this.y < -this.height) {
      this.active = false;
    }
  }
}