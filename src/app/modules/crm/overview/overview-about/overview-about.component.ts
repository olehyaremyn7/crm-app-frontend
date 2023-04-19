import { Component, OnDestroy } from '@angular/core';

import { OverviewAboutModalService } from '../services/overview-about-modal.service';

@Component({
  selector: 'app-overview-about',
  templateUrl: './overview-about.component.html',
  styleUrls: ['./overview-about.component.scss'],
})
export class OverviewAboutComponent implements OnDestroy {
  constructor(private overviewAbout: OverviewAboutModalService) {}

  public close(): void {
    this.overviewAbout.close();
  }

  public ngOnDestroy(): void {
    this.overviewAbout.destroy();
  }
}
