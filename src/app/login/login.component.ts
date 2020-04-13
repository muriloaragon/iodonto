import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth  } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any;
  senha: any;
  user: Observable<firebase.User>;

  constructor(private router: Router, public afAuth: AngularFireAuth, private fb: FormBuilder, private _snackBar: MatSnackBar) { 
    this.user = afAuth.authState;
 }

 loginForm = this.fb.group({
  email: ['', Validators.required],
  senha: ['', Validators.required],
});

  ngOnInit(): void {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  login(){
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(this.email, this.senha).then((user) => {
      localStorage['token'] = user.credential;
                      this.router.navigate(['/home']);
      })
                      .catch((error) => {
                          this.openSnackBar("Login ou Senha inválida!", "Fechar");
                          this.router.navigate(['/']);
                      });
              })
                  .catch((error) => {
                    this.openSnackBar("Login ou Senha inválida!", "Fechar");
                      this.router.navigate(['/']);
                  });
  }
  
}
