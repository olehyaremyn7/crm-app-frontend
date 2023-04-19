import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { getImagePath } from 'src/app/shared/utils.ts';

import { Nullable } from '../../../../shared/interfaces';
import { AlertService } from '../../../../shared/services/alert.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Category, CategoryResponse, ImageFormats, Sizes } from '../interfaces';
import { CategoryFormModalProps } from '../interfaces/categoryFormModal';
import { CategoriesService } from '../services/categories.service';
import { CategoryFormModalService } from '../services/category-form-modal.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @ViewChild('imageUploadInput') private inputRef: ElementRef;

  private categorySubscription: Subscription;
  private category: Category;
  public form: FormGroup;
  public categoryImage: Nullable<File>;
  public imagePreview: ArrayBuffer | string;
  public isEdit = false;
  public defaultImage = '/assets/img_placeholder.png';

  constructor(
    @Inject(MAT_DIALOG_DATA) private categoryFormProps: CategoryFormModalProps,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private notification: NotificationService,
    private categoryForm: CategoryFormModalService,
    public categoriesService: CategoriesService,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (this.categoryFormProps.isEdit) {
      this.isEdit = true;

      const { category } = this.categoryFormProps;

      if (category) {
        const { name, imagePath } = category;

        this.category = category;
        this.form.patchValue({
          name,
        });
        this.imagePreview = imagePath ? getImagePath(imagePath) : '';
      }
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();

    let categoryObservable$: Observable<CategoryResponse>;
    const { name } = this.form.value;

    if (this.isEdit) {
      categoryObservable$ = this.categoriesService.update(this.category._id as string, name, this.categoryImage);
    } else {
      categoryObservable$ = this.categoriesService.create(name, this.categoryImage);
    }

    this.categorySubscription = categoryObservable$.subscribe({
      next: ({ message }) => {
        this.form.reset();
        this.form.enable();
        this.notification.message(message);
        this.closeModal();
      },
      error: ({ status }: HttpErrorResponse) => {
        this.form.enable();

        if (status !== 409) {
          this.closeModal();
        }
      },
    });
  }

  public fileUpload($event: Event): void {
    const files = ($event.target as HTMLInputElement).files;

    if (!files) {
      return;
    }

    const file = files[0];
    const imageFormats = Object.values(ImageFormats);

    if (!imageFormats.includes(file.type as ImageFormats)) {
      this.alert.warning('You have uploaded an invalid image format');

      return;
    }

    this.categoryImage = file;

    const fileReader = new FileReader();

    fileReader.onload = (): void => {
      const { result } = fileReader;

      if (result) {
        this.imagePreview = result as ArrayBuffer;
      }
    };

    fileReader.readAsDataURL(file);
  }

  public fileInput(): void {
    this.inputRef.nativeElement.click();
  }

  public deleteUploadedImage(): void {
    this.categoryImage = null;
    this.imagePreview = '';
  }

  public bytesToSize(): string {
    const BYTES = 1024;
    const { size } = this.categoryImage as File;
    const sizes = Object.values(Sizes);

    if (!size) {
      return '0 Byte';
    }

    const sizeNameIndex = +Math.floor(Math.log(size) / Math.log(BYTES));
    const calculatedSize = Math.round(size / Math.pow(BYTES, sizeNameIndex));
    const sizeName = sizes[sizeNameIndex];

    return `${calculatedSize} ${sizeName}`;
  }

  public closeModal(): void {
    this.categoryForm.close();
  }

  public ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }

    this.categoryForm.destroy();
    this.notification.destroy();
    this.alert.destroy();
  }
}
