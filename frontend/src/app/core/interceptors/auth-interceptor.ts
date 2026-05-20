import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  let headers = req.headers.set('ngrok-skip-browser-warning', 'true');
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  const cloned = req.clone({ headers });
  return next(cloned);
};
