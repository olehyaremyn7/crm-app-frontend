import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RetryService } from '../../../shared/services/retry.service';
import { CategoriesService } from './services/categories.service';
import { CategoryFormModalService } from './services/category-form-modal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private categoriesSubscription: Subscription;
  private routeSubscription: Subscription;
  private retrySubscription: Subscription;

  constructor(
    private retryService: RetryService,
    private route: ActivatedRoute,
    private categoryForm: CategoryFormModalService,
    public categoriesService: CategoriesService,
  ) {}

  public ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      if (params['create']) {
        this.openForm();
      }
    });

    this.retrySubscription = this.retryService.onRetry.subscribe({
      next: () => this.getCategories(),
    });

    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesSubscription = this.categoriesService.fetch().subscribe();
  }

  public openForm(): void {
    this.categoryForm.open({
      isEdit: false,
    });
  }

  public ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
    }

    this.categoryForm.destroy();
    this.categoriesService.reset();
  }
}
