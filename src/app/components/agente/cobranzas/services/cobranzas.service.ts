import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV} from '@env/environment';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CobranzasService {

  constructor(private _http: HttpClient) { }

  private readonly httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}) };

  /**
   * Consulta las primas impagas de los clientes que pertenecen a un agente.
   * @param codAgente Código de agente.
   */
  getPrimasImpagasAgente(codAgente: string): Observable<any> {
    
    return this._http.get(ENV.END_POINT.PRIMAS_IMPAGAS_CLIENTES_POR_AGENTE + codAgente, this.httpOptions)
      .pipe(
        map( (clientes) => {
            return clientes['resultado'];
          }), retry(3)
      );
  }

  /**
   * Obtiene el valor póliza consultado a API Cartolas.
   * @param rutCliente rut de cliente para consultar.
   * @param poliza póliza del cliente.
   */
  getValorPoliza(rutCliente: string, poliza: string): Observable<any> {
    return this._http.get(`${ENV.END_POINT.VALOR_POLIZA_CLIENTE_POR_AGENTE}?RutCliente=${rutCliente}&Poliza=${poliza}`, this.httpOptions)
      .pipe(
        map( (resp) => {
          return resp['resultado'];
        }), retry(3)
      );
  }
}
