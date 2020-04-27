import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddConveniosComponent } from './add-convenios/add-convenios.component';
import { ConveniosService } from './service/convenios.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
export interface DialogData {
  nome: string;
  email: string;
  telefone: string;
  site: string;
}

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.scss']
})
export class ConveniosComponent implements OnInit {
  panelOpenState = false;
  getConvenios: any;
  nome: string;
  email: string;
  telefone: string;
  site: string;
  dataModal: any;
  constructor(public dialog: MatDialog, private conveniosService: ConveniosService, private loadingBar: LoadingBarService) { }

  ngOnInit(): void {
    this.carregarGrid();
  }
  carregarGrid() {
    this.loadingBar.start();
    this.conveniosService.getConvenios()
    .subscribe((data: any) => {
      this.getConvenios = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          email: e.payload.doc.data()['email'],
          nome: e.payload.doc.data()['nome'],
          site: e.payload.doc.data()['site'],
          telefone: e.payload.doc.data()['telefone']
        };
      })
    })
    this.loadingBar.complete();
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(AddConveniosComponent, {
      width: '700px',
      data: { nome: this.nome, email: this.email, telefone: this.telefone, site: this.site }
    });

    dialogRef.afterClosed().subscribe(result => {
          if (result != undefined) {
        this.dataModal = result;
        this.conveniosService.addConvenios(this.dataModal);
        this.carregarGrid();
        
      }
    });
  }

}