import { HttpInterceptorFn } from "@angular/common/http";

export const standardHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") ?? "{}");
  if (currentUser && Object.entries(currentUser).length !== 0) {
    req = req.clone({
      setHeaders: {
        uid: currentUser.uid,
        ucode: currentUser.ucode,
      },
    });
  }
  return next(req);
}