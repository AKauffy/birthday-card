import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, output, signal } from '@angular/core';
import { GOAL } from '../../model/data';

interface Fly {
  id: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-firefly-game',
  templateUrl: './firefly-game.component.html',
  styleUrls: ['./firefly-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FireflyGameComponent {
  readonly goal = GOAL;
  readonly won = output<void>();
  readonly flies = signal<Fly[]>([]);
  readonly caught = signal(0);
  readonly playing = signal(false);
  readonly done = computed(() => this.caught() >= GOAL);
  readonly percent = computed(() => (this.caught() / GOAL) * 100);

  private seq = 0;
  private spawner?: number;
  private readonly timeouts = new Set<number>();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  start(): void {
    this.playing.set(true);
    this.spawner = window.setInterval(() => this.spawn(), 700);
  }

  grab(id: number): void {
    this.flies.update((list) => list.filter((fly) => fly.id !== id));
    this.caught.update((count) => count + 1);

    if (this.done()) {
      this.stop();
      this.playing.set(false);
      this.won.emit();
    }
  }

  private spawn(): void {
    if (this.flies().length >= 5) {
      return;
    }

    const id = ++this.seq;
    this.flies.update((list) => [...list, { id, x: 8 + Math.random() * 78, y: 10 + Math.random() * 70 }]);

    const timeout = window.setTimeout(() => {
      this.timeouts.delete(timeout);
      this.flies.update((list) => list.filter((fly) => fly.id !== id));
    }, 3500);

    this.timeouts.add(timeout);
  }

  private stop(): void {
    if (this.spawner) {
      clearInterval(this.spawner);
    }

    this.timeouts.forEach(clearTimeout);
    this.timeouts.clear();
  }
}
