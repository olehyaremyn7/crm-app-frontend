import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Nullable } from '../../../../shared/interfaces';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TABLE_COLUMNS } from '../constants/table';
import { Position, PositionId } from '../interfaces';
import { PositionFormModalService } from '../services/position-form-modal.service';
import { PositionsService } from '../services/positions.service';

@Component({
  selector: 'app-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.scss'],
})
export class PositionsTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private paginatorRef: MatPaginator;
  @ViewChild(MatSort) private sortRef: MatSort;

  private positionsSubscription: Subscription;
  private deletePositionSubscription: Subscription;
  public tableDataSource = new MatTableDataSource<Position>();
  public tableColumns = TABLE_COLUMNS;
  public positionId: Nullable<PositionId> = null;

  constructor(
    private positionForm: PositionFormModalService,
    private notification: NotificationService,
    private confirm: ConfirmService,
    private positionsService: PositionsService,
  ) {}

  public ngOnInit(): void {
    this.positionsSubscription = this.positionsService.positions$.subscribe({
      next: (positions) => {
        this.tableDataSource.data = positions;
        this.tableDataSource._updateChangeSubscription();
        this.paginatorToFirstPage();
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
    this.paginatorToFirstPage();
  }

  public clearFilter($event: Event) {
    $event.stopPropagation();

    this.tableDataSource.filter = '';
  }

  private paginatorToFirstPage(): void {
    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  public openForm(position: Position): void {
    this.positionForm.open({
      isEdit: true,
      position,
    });
  }

  public confirmDelete({ _id: id, name }: Position): void {
    this.confirm.openRemoveConfirm(`Do you want to remove the "${name}" position?`, ({ confirmed }) => {
      if (confirmed && id) {
        this.positionId = id;
        this.deleteCategory(id);
      }
    });
  }

  private deleteCategory(id: PositionId): void {
    this.deletePositionSubscription = this.positionsService.remove(id).subscribe({
      next: ({ message }) => {
        this.positionId = null;
        this.notification.message(message);
      },
      error: () => {
        this.positionId = null;
      },
    });
  }

  public isDeletingPosition(id: PositionId): boolean {
    return this.positionsService.isDeleteLoading && this.positionId === id;
  }

  public ngOnDestroy(): void {
    if (this.positionsSubscription) {
      this.positionsSubscription.unsubscribe();
    }

    if (this.deletePositionSubscription) {
      this.deletePositionSubscription.unsubscribe();
    }

    this.confirm.destroyRemoveConfirm();
    this.positionForm.destroy();
    this.notification.destroy();
  }
}
