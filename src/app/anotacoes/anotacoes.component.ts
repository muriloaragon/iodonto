import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAnotacoesComponent } from './add-anotacoes/add-anotacoes.component';
import { AnotacoesService } from './service/anotacoes.service';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.component.html',
  styleUrls: ['./anotacoes.component.scss']
})
export class AnotacoesComponent implements OnInit {
  date: any;
  descricao: any;
  status: any;
  dataModal: any;
  lembrete: any;

  constructor(public dialog: MatDialog, private anotacoesService: AnotacoesService) { }

  ngOnInit(): void {
    this.getannotacoes();
  }
  remove(event: any){
    this.anotacoesService.removeAnotacoes(event)
  }
  changeStatus(data, id){
    data.status = true;
    this.anotacoesService.updateAnotacoes(data, id);
  }
  getannotacoes(){
    this.anotacoesService.getAnotacoes()
    .subscribe((data: any) => {
      this.lembrete = data.map(e => {
        return {
          id: e.payload.doc.id,
          date: e.payload.doc.data()['date'],
          status: e.payload.doc.data()['status'],
          descricao: e.payload.doc.data()['descricao']
        };
      })
    })
  }
  addAnnotation(){
    const dialogRef = this.dialog.open(AddAnotacoesComponent, {
      width: '700px',
      data: { date: this.date, descricao: this.descricao, status: this.status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.dataModal = result;
        this.dataModal.status = false;
        this.anotacoesService.addAnotacoes(this.dataModal);
      }
    });

  }

}
