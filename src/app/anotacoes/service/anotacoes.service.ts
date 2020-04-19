import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnotacoesService {

  constructor(private firestore: AngularFirestore) { }

  getAnotacoes() {
    return this.firestore.collection('Anotacoes').snapshotChanges();
  }
  addAnotacoes(paciente) {
    return this.firestore.collection('Anotacoes').add(paciente);
  }
  updateAnotacoes(paciente, id) {
    return this.firestore.doc('Anotacoes/' + id).update(paciente);
  }
  removeAnotacoes(id) {
    return this.firestore.doc('Anotacoes/' + id).delete();
  }
}
