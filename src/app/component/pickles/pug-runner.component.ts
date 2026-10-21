import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-pug-runner',
  templateUrl: './pug-runner.component.html',
  styleUrls: ['./pug-runner.component.scss'],
  host: {
    '(window:scroll)': 'onScroll()',
    '[style.--p]': 'progress()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PugRunnerComponent {
  readonly progress = signal(0);
  readonly running = signal(false);
  readonly facing = signal(1);

  private last = 0;
  private timer?: number;

  onScroll(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    const y = window.scrollY;

    this.progress.set(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);

    if (y !== this.last) {
      this.facing.set(y > this.last ? 1 : -1);
      this.last = y;
    }

    this.running.set(true);
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.running.set(false), 180);
  }
}
