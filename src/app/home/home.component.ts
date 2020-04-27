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
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lembrete: any
  badgeContent: number;
  countLembrete: any;
  opened: boolean = false;
  openedNot: boolean = false;
  routerNav: string = 'agenda';
  user: Observable<firebase.User>;
  mode = new FormControl('over');
  arrayAniv: any = [];
  perfil: any;
  userPerfil: any;
  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public afAuth: AngularFireAuth, private anotacoesService: AnotacoesService, private pacientesServices: PacientesService, private homeService: HomeService) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/calendar_today-24px.svg'));
  }

  ngOnInit(): void {
    this.getannotacoes();
    this.getPerfil();
  }
  getPerfil() {
    this.perfil = localStorage.getItem("email");
    this.homeService.getUsers()
      .subscribe((data: any) => {
        let user: any = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            cro: e.payload.doc.data()['cro'],
            email: e.payload.doc.data()['email']
          };
        })
        user.forEach(element => {
          if (this.perfil == element.email) {
            this.userPerfil = Object.assign({
              "name": element.name,
              "cro": element.cro
            })
          }
        });
        console.log(this.userPerfil);  
      })
      
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
}
