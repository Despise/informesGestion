import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  page: {error:string, title:string} = 
    {
      error: '404', 
      title: 'PÁGINA NO ENCONTRADA.'
    };

  constructor() { }

  ngOnInit(): void {
  }

}
