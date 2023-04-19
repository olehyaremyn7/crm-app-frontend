import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getImagePath } from 'src/app/shared/utils.ts';

import { CategoriesService } from '../../categories/services/categories.service';
import { LAYOUT_RESOLUTION_BREAKPOINTS } from '../constants/orderCategoriesLayout';
import { calculateLayoutResolutionBreakpoints } from '../utils/orderCategoriesLayout';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit, OnDestroy {
  private layoutSubscription: Subscription;
  private layoutResolutionBreakpoints$ = this.breakpointObserver.observe(LAYOUT_RESOLUTION_BREAKPOINTS);
  public breakpoint = 0;
  public rowHeight = 0;

  constructor(public categoriesService: CategoriesService, private breakpointObserver: BreakpointObserver) {}

  public ngOnInit(): void {
    this.layoutSubscription = this.layoutResolutionBreakpoints$.subscribe(({ breakpoints }) => {
      const { breakpoint, rowHeight } = calculateLayoutResolutionBreakpoints(breakpoints);

      this.breakpoint = breakpoint;
      this.rowHeight = rowHeight;
    });
  }

  public createCategoryImagePath(imagePath: string | undefined): string {
    return imagePath ? getImagePath(imagePath) : '/assets/img_placeholder.png';
  }

  public ngOnDestroy() {
    if (this.layoutSubscription) {
      this.layoutSubscription.unsubscribe();
    }
  }
}
