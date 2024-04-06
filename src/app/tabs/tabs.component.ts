import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  activeItemIndex!: number;

  destroyRef = inject(DestroyRef);
  constructor(private router: Router,
              private cdr: ChangeDetectorRef) {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(ev  => {
      if (ev instanceof NavigationEnd) {
        switch (true) {
          case this.router.url.includes('/tags'):
            this.activeItemIndex = 3;
            break;
          case this.router.url.includes('/notifications'):
            this.activeItemIndex = 2;
            break;
          case this.router.url.includes('/notes'):
            this.activeItemIndex = 1;
            break;
          default:
            this.activeItemIndex = 0;
            break;
        }
        this.cdr.markForCheck();
      }
    })
  }

  goTags() {
    this.router.navigate(['tags'])
  }

  goHome() {
    this.router.navigate(['']);
  }

  goNotifications() {
    this.router.navigate(['notifications']);
  }

  goNotes() {
    this.router.navigate(['notes']);
  }
}
