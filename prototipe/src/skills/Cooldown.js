/**
 * FUNGSI  : Cooldown helper
 * STATUS  : dipakai di ActionButtons
 */
export class Cooldown {
  constructor(ms) {
    this.total = ms;
    this.remaining = 0;
  }
  start() { this.remaining = this.total; }
  update(dt) {
    if (this.remaining > 0) this.remaining = Math.max(0, this.remaining - dt);
  }
  get ready() { return this.remaining <= 0; }
  get ratio() { return this.remaining / this.total; }
}
