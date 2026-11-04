import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PugRunnerComponent } from '@app/component/pickles/pug-runner.component';
import { HER_NAME, MEMORIES, YOUR_NAME } from '@app/model/data';

@Component({
  selector: 'app-root',
  imports: [PugRunnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly her = HER_NAME;
  readonly you = YOUR_NAME;
  readonly memories = MEMORIES;

  hide(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (target) {
      target.hidden = true;
    }
  }
}
