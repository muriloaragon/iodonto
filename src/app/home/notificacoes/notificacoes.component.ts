import { Component, OnInit } from '@angular/core';
import { AnotacoesService } from 'src/app/anotacoes/service/anotacoes.service';
import { PacientesService } from 'src/app/pacientes/service/pacientes.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {
  lembrete: any;
  paciente: any;
  arrayAniv: any = [];
  constructor(private anotacoesService: AnotacoesService, private pacientesServices: PacientesService) { }

  ngOnInit(): void {
    this.getannotacoes();
    this.getPacientes();
  }
  getannotacoes() {
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
  getPacientes() {
    this.pacientesServices.getPolicies()
      .subscribe(data => {
        this.paciente = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            nome: e.payload.doc.data()['nome'],
            celular: e.payload.doc.data()['celular'],
            email: e.payload.doc.data()['email'],
            telefone: e.payload.doc.data()['telefone'],
            dataPrimeiraConsulta: e.payload.doc.data()['dataPrimeiraConsulta'],
            numeroConvenio: e.payload.doc.data()['numeroConvenio'],
            dataNascimento: e.payload.doc.data()['dataNascimento'],
            convenio: e.payload.doc.data()['convenio'],
          };
        })
        let aniver: any = [];
        this.paciente.forEach(element => {
          aniver.push({ name: element.nome, dataNascimento: new Date(element.dataNascimento.seconds * 1000) })
        });
        let inicio = new Date(Date.now());
        let hj = inicio.getMonth() + 1;
        this.arrayAniv = [];
        aniver.forEach(element => {
          element.dataNascimento.toLocaleDateString();
          if (hj == element.dataNascimento.getMonth() + 1) {
            this.arrayAniv.push(element);
          }
        });
      });
  }
}
