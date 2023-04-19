import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Nullable } from '../../../../shared/interfaces';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TABLE_COLUMNS } from '../constants/table';
import { Category, CategoryId } from '../interfaces';
import { CategoriesService } from '../services/categories.service';
import { CategoryFormModalService } from '../services/category-form-modal.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private paginatorRef: MatPaginator;
  @ViewChild(MatSort) private sortRef: MatSort;

  private categoriesSubscription: Subscription;
  private deleteCategorySubscription: Subscription;
  public tableDataSource = new MatTableDataSource<Category>();
  public tableColumns = TABLE_COLUMNS;
  public categoryId: Nullable<CategoryId> = null;

  constructor(
    private categoryForm: CategoryFormModalService,
    private notification: NotificationService,
    private confirm: ConfirmService,
    private categoriesService: CategoriesService,
  ) {}

  public ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService.categories$.subscribe({
      next: (categories) => {
        this.tableDataSource.data = categories;
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

  public openForm(category: Category): void {
    this.categoryForm.open({
      isEdit: true,
      category,
    });
  }

  public confirmDelete({ _id: id, name }: Category): void {
    this.confirm.openRemoveConfirm(`Do you want to remove the "${name}" category?`, ({ confirmed }) => {
      if (confirmed && id) {
        this.categoryId = id;
        this.deleteCategory(id);
      }
    });
  }

  private deleteCategory(id: CategoryId): void {
    this.deleteCategorySubscription = this.categoriesService.remove(id).subscribe({
      next: ({ message }) => {
        this.categoryId = null;
        this.notification.message(message);
      },
      error: () => {
        this.categoryId = null;
      },
    });
  }

  public isDeletingCategory(id: CategoryId): boolean {
    return this.categoriesService.isDeleteLoading && this.categoryId === id;
  }

  public ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.deleteCategorySubscription) {
      this.deleteCategorySubscription.unsubscribe();
    }

    this.confirm.destroyRemoveConfirm();
    this.categoryForm.destroy();
    this.notification.destroy();
  }
}
