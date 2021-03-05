import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthCobranzasApi } from '@interfaces/auth-cobranzas-api.interface';
import { AuthResponse } from '@interfaces/auth-response.interface';
import { environment as ENV } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthCobranzasService {

  private readonly httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  private readonly credenciales = { Username: 'GestionCobranza', Password: 'C0branza5_P1an3x_g35ti0n' };
  private tokenHelp = new JwtHelperService();
  private isLoginCobranzasToken$ = new BehaviorSubject<string>(null);

  constructor(private _http: HttpClient) {
    this.isLoginCobranzasToken$ = new BehaviorSubject<string>(this.leerToken());
  }

  get tokenCobranza(): string {
    return this.isLoginCobranzasToken$.value;
  }

  /**
   * Obtiene desde la API el token de acceso a consultas para los endpoints de cobranzas pf tr.
   * @param authCredentials Credenciales de acceso para API
   */
  getTokenApp(authCredentials: AuthCobranzasApi): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${ENV.END_POINT.AUTHENTICATE}`, authCredentials, this.httpOptions)
      .pipe(
        map((resp: AuthResponse) => {
          return resp
        }), catchError((err) => this.handlerException(err))
      );
  }

  /**
   * Guarda en session storage el nuevo token obtenido desde api cobranzas.
   * @param token Nuevo token obtenido
   */
  guardarToken(token: string): void {
    this.isLoginCobranzasToken$.next(token);
    sessionStorage.setItem('token_cobranzas', token);
  }

  /**
   * Obtiene token existen en session storage.
   */
  leerToken(): string {
    return sessionStorage.getItem('token_cobranzas');
  }

  /**
   * Valida el token existente, en session storage.
   * NOTA: TRUE  -> EXPIRADO
   *       FALSE -> NO EXPIRADO
   */
  validarToken(): boolean {
    const token = this.leerToken();
    const IS_EXPIRED = this.tokenHelp.isTokenExpired(token);
    return IS_EXPIRED;
  }

  /**
   * Obtiene nuevo token si el actual ya expiró.
   */
  refreshToken(): void {
    this.removerToken();
    this.getTokenApp(this.credenciales).subscribe((resp) => {
      this.guardarToken(resp['Resultado'].Token);
    }), catchError((err) => this.handlerException(err))
  }
  
  /**
   * Remueve token de session storage.
   */
  removerToken() {
    this.isLoginCobranzasToken$.next(null);
    sessionStorage.removeItem('token_cobranzas');
  }

  /**
   * Manager de errores de servicio
   * @param err recibe el error computado.
   */
  private handlerException(err: any): Observable<never> {
    let errorMsg = 'a ocurrido un error.';
    if (err) {
      errorMsg = `Error: code ${err.message}`;
    }
    return throwError(errorMsg);
  }

}
