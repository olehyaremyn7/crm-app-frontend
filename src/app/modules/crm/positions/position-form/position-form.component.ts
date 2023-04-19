import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { NotificationService } from '../../../../shared/services/notification.service';
import { Position, PositionResponse } from '../interfaces';
import { PositionFormModalProps } from '../interfaces/positionFormModal';
import { PositionFormModalService } from '../services/position-form-modal.service';
import { PositionsService } from '../services/positions.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
})
export class PositionFormComponent implements OnInit, OnDestroy {
  private positionSubscription: Subscription;
  private position: Position;
  public form: FormGroup;
  public isEdit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private positionFormProps: PositionFormModalProps,
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    private positionForm: PositionFormModalService,
    public positionsService: PositionsService,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      cost: [1, [Validators.required, Validators.min(1)]],
    });

    if (this.positionFormProps.isEdit) {
      this.isEdit = true;

      const { position } = this.positionFormProps;

      if (position) {
        const { name, cost } = position;

        this.position = position;
        this.form.patchValue({
          name,
          cost,
        });
      }
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();

    let positionObservable$: Observable<PositionResponse>;
    const position: Position = {
      ...this.form.value,
      category: this.positionsService.categoryId,
    };

    if (this.isEdit) {
      position._id = this.position._id;
      positionObservable$ = this.positionsService.update(position);
    } else {
      positionObservable$ = this.positionsService.create(position);
    }

    this.positionSubscription = positionObservable$.subscribe({
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

  public closeModal(): void {
    this.positionForm.close();
  }

  public ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }

    this.positionForm.destroy();
    this.notification.destroy();
  }
}
