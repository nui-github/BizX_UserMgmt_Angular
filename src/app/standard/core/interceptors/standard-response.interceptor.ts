import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import Swal from "sweetalert2";

export const standardResponseInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  return next(req)
    .pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.status === "fail") {
            if (event.body.code === "AUTHENTICATION_FAIL") {
              Swal.fire({
                title: "Authentication",
                text: event.body.message,
                icon: "warning",
                buttonsStyling: false,
                showCancelButton: false,
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "btn btn-secondary",
                }
                // confirmButtonClass: "btn btn-secondary btn-fill swal2-close-btn",
              }).then((result) => {
                sessionStorage.removeItem("currentUser");
                sessionStorage.removeItem("permissionList");
                router.navigate([""]);
              });
            } else if (event.body.code === "SESSION_EXPIRE") {
              Swal.fire({
                title: "Authentication",
                text: "Session Expire",
                icon: "warning",
                buttonsStyling: false,
                showCancelButton: false,
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "btn btn-secondary",
                }
                // confirmButtonClass: "btn btn-secondary btn-fill swal2-close-btn",
              }).then((result) => {
                sessionStorage.removeItem("currentUser");
                sessionStorage.removeItem("permissionList");
                router.navigate([""]);
              });
            }
          }
        }
        return event;
      })
    );
}