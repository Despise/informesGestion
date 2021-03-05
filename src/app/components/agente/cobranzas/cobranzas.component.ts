import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  ViewChild, 
  Output,
  EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { 
  ListCliImpagos, 
  PolizaImpaga } from '@interfaces/polizas-impagas-clientes.interface';
import { CobranzasService } from '@services-cobranzas/cobranzas.service';

@Component({
  selector: 'app-informes-cobranzas',
  templateUrl: './cobranzas.component.html',
  styleUrls: ['./cobranzas.component.css']
})
export class InformesCobranzasComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = [
    'nombresCli',
    'rutCliente',
    'telefonoPrincipalCli',
    'emailPrincipalCli',
    'direccionP',
    'poliza',
    'mesesImpago',
    'accion'
  ];

  public listaClientesImpagos: ListCliImpagos[] = [];
  public dataSource = new MatTableDataSource();
  public productos: string[] = [];
  public busquedaValor = '';
  public selectedCriticas = '';
  public selectedProd = '';
  public isLoadingResults = true;
  public valPol: string = '';
  public msgMatTable: string = 'No se encontraron datos';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('selectProductos')selectProductos: MatSelect;
  @ViewChild('selectCriticas')selectCriticas: MatSelect;
  @Output()selectionChange = new EventEmitter<any>();

  constructor(
      private activatedRouter: ActivatedRoute, 
      private cobranzaSvc: CobranzasService
    ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.getPrimasImpagasAgente(params.codAgente);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Aplica el filtro a la tabla, segun lo ingresado o seleccionado en los elementos.
   * @param eventValue evento del input de búsqueda.
   * @param indicador elemento de busqueda.
   */
  filtroBusqueda(eventValue: string, indicador: string): void {
    if (indicador === 'indicador-poliza') { // Pólizas Críticas
      if(eventValue === 'TODAS'){
        this.dataSource.data = this.listaClientesImpagos;
      }else {
        this.dataSource.data = this.listaClientesImpagos.slice().filter(
          (element) => JSON.stringify(element.IndicadorPolizaCritica).indexOf(eventValue) !== -1
        );
      }
    }else if (indicador === 'general') { // Búsqueda global
      this.dataSource.filter = eventValue.trim().toLowerCase();
    } else if (indicador === 'producto') { // Producto
      if(eventValue === 'TODOS'){
        this.dataSource.data = this.listaClientesImpagos;
      } else {
        this.dataSource.data = this.listaClientesImpagos.slice().filter(
          (element) => JSON.stringify(element.descPlan).indexOf(eventValue) !== -1
        );
      }
    } else {
      this.dataSource.filter = eventValue.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Limpia los filtros de búsqueda y restaura tabla.
   */
  limpiarFiltros(): void{
    this.busquedaValor = '';
    this.selectProductos.value = '';
    this.selectCriticas.value = '';
    this.dataSource.data = this.listaClientesImpagos;
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Trigger del menú de detalle producto.
   * @param rutCliente 
   * @param poliza 
   */
  openDetallePoliza(rutCliente: string, poliza: string): void {
    this.valPol = '';
    const _rutCliente = rutCliente.split('-')[0];
    const _poliza = poliza.split('-')[1];
    this.cobranzaSvc.getValorPoliza(_rutCliente, _poliza).subscribe(value => {
      this.valPol = value.valorPoliza === "N/A" ? value.valorPoliza : `UF ${value.valorPoliza}`;
    });
  }

  /**
   * Procesa el array de los clientes y genera formato para el objeto final de la tabla.
   * @param codAgente Código de agente de planex (migra).
   */
  getPrimasImpagasAgente(codAgente: string): void {
    let clienteImpago: any = {};
    this.cobranzaSvc.getPrimasImpagasAgente(codAgente).subscribe((list: PolizaImpaga[]) => {
      list.forEach( (cli: PolizaImpaga) => {
        clienteImpago.nombresCli = this.getFullNombre(cli.nombresCliente, cli.apellidosCliente);
        clienteImpago.rutCliente = `${ cli.rutCliente }-${ cli.dvCliente }`;
        clienteImpago.telefonoPrincipalCli = cli.telefonoPrincipalCliente;
        clienteImpago.emailPrincipalCli = cli.emailPrincipalCliente;
        clienteImpago.direccionP = this.getFullDireccion(
            cli.direccionCalleCliente, 
            cli.direccionNumeroCliente, 
            cli.direccionRestoCliente, 
            cli.direccionComunaCliente, 
            cli.direccionCiudadCliente
          );
        clienteImpago.descPlan = cli.descPlan;
        clienteImpago.poliza = `${ cli.codSerie }-${ cli.idNumPoliza }`;
        clienteImpago.IndicadorPolizaCritica = cli.IndicadorPolizaCritica;
        clienteImpago.mesesImpago = cli.mesesImpago;
        clienteImpago.descPeriodicidad = cli.descPeriodicidad;
        clienteImpago.mtoPrima = `${cli.descMoneda} ${cli.mtoPrima}`
        clienteImpago.descEstadoMigra = cli.descEstadoMigra;
        clienteImpago.idNumeroCuenta = cli.idNumeroCuenta;
        clienteImpago.SaldoMO = cli.SaldoMO;
        this.listaClientesImpagos.push(clienteImpago);
        clienteImpago = {};
      });
      this.dataSource.data = this.listaClientesImpagos;
      this.isLoadingResults = this.listaClientesImpagos.length >= 0 ? false : true;
      this.listaClientesImpagos.forEach((col) => this.productos.push(col.descPlan));
      const productosSort = [...new Set(this.productos)].sort();
      this.productos.splice(0);
      this.productos = [...productosSort];
    }, (error) => {
      this.dataSource.data = this.listaClientesImpagos;
      this.msgMatTable = "Error en la consulta, ingrese nuevamente";
      this.isLoadingResults = false;
    });
  }

  /**
   * Entrega el nombre completo del cliente.
   * @param nom Primer y segundo nombre.
   * @param ape Apellido paterno y materno.
   */
  getFullNombre(nom: string, ape: string): string {
    const nombres: string = nom;
    const apellidos: string = ape;
    return nombres +' '+apellidos;
  }

  /**
   * Entrega la dirección completa del cliente.
   * @param nombreCalle Nombre de la calle.
   * @param numero Número de la calle.
   * @param depto Número de departamento.
   * @param comuna Nombre de comuna.
   * @param ciudad Nombre de la ciudad.
   */
  getFullDireccion(nombreCalle: string, numero: string, depto: string, comuna: string, ciudad: string): string {
    const _nombreCalle: string = (nombreCalle === null) ? '' : nombreCalle;
    const _numero: string = (numero === null) ? '' : numero;
    const _depto: string = (depto === null) ? '' : depto;
    const _comuna: string = (comuna === null) ? '' : comuna;
    const _ciudad: string = (ciudad === null) ? '' : ciudad;
    return (
      _nombreCalle + ' ' + _numero + ' ' + _depto + ' ' + _comuna + ' ' + _ciudad
    );
  }

}
