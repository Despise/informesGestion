import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-loading',
  templateUrl: './table-loading.component.html',
  styleUrls: ['./table-loading.component.css']
})
export class TableLoadingComponent implements OnInit {

  @Input() columns: number;
  @Input() rows: number;
  columnas: number[];
  filas: number[];
  constructor() { }

  ngOnInit(): void {
    this.columnas = Array(this.columns-1).fill(1).map((x,i)=>i);
    this.filas = Array(this.rows).fill(1).map((y,i)=>i);
  }
}
