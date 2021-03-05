import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCobranzasService } from '@services-cobranzas/auth-cobranzas.service';

@Injectable()
export class SecurityHttpInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthCobranzasService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if( request.url.includes('ObtenerPrimasImpagasClientesPorAgente') || 
        request.url.includes('ObtenerValorPoliza') 
      ){
      const isExpiredToken = this.authSvc.validarToken();
      if(isExpiredToken){
        this.authSvc.refreshToken(); 
      } 
      const currentToken = this.authSvc.tokenCobranza;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
