import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { FormControl } from '@angular/forms';
import { AnotacoesService } from '../anotacoes/service/anotacoes.service';
import { PacientesService } from '../pacientes/service/pacientes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lembrete: any;
  paciente: any;
  badgeContent: number;
  countLembrete: any;
  opened: boolean = false;
  openedNot: boolean = false;
  routerNav: string = 'agenda';
  user: Observable<firebase.User>;
  mode = new FormControl('over');
  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public afAuth: AngularFireAuth, private anotacoesService: AnotacoesService, private pacientesServices: PacientesService) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/calendar_today-24px.svg'));
  }

  ngOnInit(): void {
    this.getannotacoes();
    this.getPacientes();
  }
  teste() {
    console.log("aqui")
  }
  nav(nav: string): void {
    this.routerNav = nav;
    this.opened = false;
  }
  getAdd(event: any) {
    console.log("home", event);
    this.routerNav = event;
  }
  public logout() {
    this.router.navigate(['/']);
    return this.afAuth.signOut();
  }
  getannotacoes() {
    console.log("aqui")
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
        this.badgeContent = 10;
        this.countLembrete = this.lembrete.length;
        console.log(this.countLembrete);
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
          aniver.push({ name: element.nome, empoloyeeID: new Date(element.dataNascimento.seconds * 1000).toLocaleDateString() })
        });
        let date = Date.now().toLocaleString();
        aniver.filter(date); 

        console.log(aniver);
        console.log(new Date(this.paciente[0].dataNascimento.seconds * 1000).toLocaleDateString());
      });
  }
}
