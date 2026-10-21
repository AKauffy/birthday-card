import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FireflyGameComponent } from './component/firefly/firefly-game.component';
import { PugRunnerComponent } from './component/pickles/pug-runner.component';
import { HER_NAME, LETTER, MEMORIES, YOUR_NAME } from './model/data';

@Component({
  selector: 'app-root',
  imports: [FireflyGameComponent, PugRunnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly her = HER_NAME;
  readonly you = YOUR_NAME;
  readonly memories = MEMORIES;
  readonly unlocked = signal(false);
  readonly typed = signal('');

  hide(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      target.hidden = true;
    }
  }

  unlock(): void {
    this.unlocked.set(true);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth'
      });
    }, 50);

    if (reduce) {
      this.typed.set(LETTER);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      this.typed.set(LETTER.slice(0, ++index));
      if (index >= LETTER.length) {
        clearInterval(timer);
      }
    }, 28);
  }
}
