import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../../../shared/services/notification.service';
import { CrmPaths } from '../../interfaces/routes';
import { Position } from '../../positions/interfaces';
import { PositionsService } from '../../positions/services/positions.service';
import { ORDER_POSITIONS_TABLE_COLUMNS } from '../constants/tables';
import { OrderPosition } from '../interfaces/order';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss'],
})
export class OrderPositionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private paginatorRef: MatPaginator;
  @ViewChild(MatSort) private sortRef: MatSort;

  private positionsSubscription: Subscription;
  public tableDataSource = new MatTableDataSource<Position>();
  public tableColumns = ORDER_POSITIONS_TABLE_COLUMNS;

  constructor(
    private positionsService: PositionsService,
    private notification: NotificationService,
    private cart: CartService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.positionsSubscription = this.positionsService.orderPositions$.subscribe({
      next: (positions) => {
        if (!positions.length) {
          this.router.navigate([CrmPaths.ORDER]);
          this.notification.message('Category not selected');
        }

        this.tableDataSource.data = positions;
      },
    });
  }

  public ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginatorRef;
    this.tableDataSource.sort = this.sortRef;
  }

  public applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;

    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  public clearFilter($event: Event) {
    $event.stopPropagation();

    this.tableDataSource.filter = '';
  }

  public addToCart(position: Position) {
    const { quantity } = position;

    this.notification.message(`Added x${quantity}`);
    this.cart.add(position as OrderPosition);
  }

  public ngOnDestroy(): void {
    if (this.positionsSubscription) {
      this.positionsSubscription.unsubscribe();
    }

    this.notification.destroy();
  }
}
