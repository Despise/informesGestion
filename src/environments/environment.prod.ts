const BASE_API_COBRANZA: string = "http://172.16.150.59/Web_API/GestionCobranzaFuerzaDeVenta/";
export const environment = {
  production: true,
  END_POINT: {
    AUTHENTICATE: `${BASE_API_COBRANZA}api/Login/Authenticate`,
    PRIMAS_IMPAGAS_CLIENTES_POR_AGENTE: `${BASE_API_COBRANZA}api/Agente/ObtenerPrimasImpagasClientesPorAgente?CodAgente=`,
    VALOR_POLIZA_CLIENTE_POR_AGENTE: `${BASE_API_COBRANZA}api/Agente/ObtenerValorPoliza`
  }
};
