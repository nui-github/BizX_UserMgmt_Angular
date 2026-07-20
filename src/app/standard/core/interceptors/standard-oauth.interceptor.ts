import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { StandardTokenService } from "../../pages/standard-auth/services/standard-token.service";

export const standardOAuthInterceptor: HttpInterceptorFn = (req, next) => {
  let tokenService = inject(StandardTokenService);

  let intReq = req;
  const token = tokenService.getAccessToken();
  if (token != null && req.url.includes('resource')) {
    intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
  return next(req);
}