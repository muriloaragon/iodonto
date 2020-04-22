import { Component, OnInit } from '@angular/core';
import { AnotacoesService } from 'src/app/anotacoes/service/anotacoes.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {
  lembrete: any;

  constructor(private anotacoesService: AnotacoesService) { }

  ngOnInit(): void {
    this.getannotacoes();
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
}
