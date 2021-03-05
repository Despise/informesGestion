import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { AuthCobranzasService } from '@services-cobranzas/auth-cobranzas.service';

@Injectable({
  providedIn: 'root'
})
export class CobranzasGuard implements CanLoad {

  constructor(private authSvc: AuthCobranzasService) {
  }

  canLoad(route: Route): boolean {
      // const isExpiredToken = this.authSvc.validarToken();
      // if(isExpiredToken){
      //   this.authSvc.refreshToken();
      //   return true;
      // }
    return true;
  }
}
