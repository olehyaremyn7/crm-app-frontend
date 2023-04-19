import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Nullable } from '../../../shared/interfaces';
import { RetryService } from '../../../shared/services/retry.service';
import { CategoryId } from '../categories/interfaces';
import { CategoriesService } from '../categories/services/categories.service';
import { PositionsService } from '../positions/services/positions.service';
import { CartService } from './services/cart.service';
import { OrderCartModalService } from './services/order-cart-modal.service';
import { isRootPage } from './utils';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  private categoriesSubscription: Subscription;
  private positionsSubscription: Subscription;
  private retrySubscription: Subscription;
  private routerSubscription: Subscription;
  private routeSubscription: Subscription;
  public isRoot = true;

  constructor(
    private retryService: RetryService,
    private cartModal: OrderCartModalService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService: CartService,
    public categoriesService: CategoriesService,
    public positionsService: PositionsService,
  ) {}

  public ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.isRoot = isRootPage(event.url);

          if (!this.isRoot) {
            this.getCategoryId();
          }
        }
      },
    });

    this.retrySubscription = this.retryService.onRetry.subscribe({
      next: () => {
        if (this.isRoot) {
          this.getCategories();
        } else {
          this.getPositions();
        }
      },
    });

    this.getCategories();
  }

  private getCategoryId(): void {
    for (const child of this.route.children) {
      this.routeSubscription = child.params.subscribe({
        next: (params) => {
          const categoryId: Nullable<CategoryId> = params['categoryId'] ? params['categoryId'] : null;

          if (categoryId) {
            this.positionsService.setCategoryId = categoryId;
            this.getPositions();
          }
        },
      });
    }
  }

  private getCategories(): void {
    this.categoriesSubscription = this.categoriesService.fetch().subscribe();
  }

  private getPositions(): void {
    this.positionsSubscription = this.positionsService.fetch().subscribe();
  }

  public openCart(): void {
    this.cartModal.open();
  }

  public ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.positionsSubscription) {
      this.positionsSubscription.unsubscribe();
    }

    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    this.cartModal.destroy();
    this.cartService.clear();
    this.categoriesService.reset();
    this.positionsService.reset();
  }
}
