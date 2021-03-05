// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_API_COBRANZA: string = "http://172.16.150.59/Web_API/GestionCobranzaFuerzaDeVenta/";
export const environment = {
  production: false,
  END_POINT: {
    AUTHENTICATE: `${BASE_API_COBRANZA}api/Login/Authenticate`,
    PRIMAS_IMPAGAS_CLIENTES_POR_AGENTE: `${BASE_API_COBRANZA}api/Agente/ObtenerPrimasImpagasClientesPorAgente?CodAgente=`,
    VALOR_POLIZA_CLIENTE_POR_AGENTE: `${BASE_API_COBRANZA}api/Agente/ObtenerValorPoliza`
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
