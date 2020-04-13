import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  opened: boolean = false;
  routerNav: string = 'agenda';
  user: Observable<firebase.User>;

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public afAuth: AngularFireAuth) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/calendar_today-24px.svg'));
  }

  ngOnInit(): void {
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
}
