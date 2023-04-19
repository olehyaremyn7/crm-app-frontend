import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';
import { CrmPaths } from '../../crm/interfaces/routes';
import { LoginQueryParams, LoginResponse, User } from '../interfaces';
import { AuthPaths } from '../interfaces/routes';
import { AuthorizationService } from '../services/authorization.service';
import { isRegistrationRoute } from '../utils.ts';
import { loginQueryMessages } from '../utils.ts/messages';

@Component({
  selector: 'app-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss'],
})
export class AuthorizationFormComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  private routeSubscription: Subscription;
  public form: FormGroup;
  public isRegistration = false;
  public isPasswordHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    public authService: AuthorizationService,
  ) {}

  public ngOnInit(): void {
    this.isRegistration = isRegistrationRoute(this.router.url);

    if (!this.isRegistration) {
      this.routeSubscription = this.route.queryParams.subscribe((params) => {
        this.notification.message(loginQueryMessages(params));
      });
    }

    this.form = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}')],
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(8), Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')],
      ],
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();

    let authObservable$: Observable<User | LoginResponse>;
    const user: User = {
      ...this.form.value,
    };

    if (this.isRegistration) {
      authObservable$ = this.authService.registration(user);
    } else {
      authObservable$ = this.authService.login(user);
    }

    this.authSubscription = authObservable$.subscribe({
      next: () => {
        const navigateCommand = this.isRegistration ? [AuthPaths.LOGIN] : [CrmPaths.OVERVIEW];
        const navigateExtras: NavigationExtras = this.isRegistration
          ? {
              queryParams: {
                [LoginQueryParams.REGISTERED]: true,
              },
            }
          : {};

        this.router.navigate(navigateCommand, navigateExtras);
        this.form.reset();

        if (this.isRegistration) {
          this.form.enable();
        }
      },
      error: () => {
        this.form.enable();
      },
    });
  }

  public showHidePasswordToggle($event: Event): void {
    $event.stopPropagation();

    this.isPasswordHide = !this.isPasswordHide;
  }

  public ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    this.notification.destroy();
  }
}
