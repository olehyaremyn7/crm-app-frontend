import { Params } from '@angular/router';

import { LoginQueryParams } from '../interfaces';

export const loginQueryMessages = (queryParams: Params): string => {
  if (queryParams[LoginQueryParams.NOT_LOGIN]) {
    return 'You are not login. Please, sign in';
  } else if (queryParams[LoginQueryParams.REGISTERED]) {
    return 'User registered. Now you can sing in';
  } else if (queryParams[LoginQueryParams.AUTH_FAILED]) {
    return 'Session failed. Please, sign in again';
  } else if (queryParams[LoginQueryParams.LOGOUT]) {
    return 'You have successfully logout';
  }

  return '';
};
