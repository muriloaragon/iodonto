import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConveniosService {

  constructor(private firestore: AngularFirestore) { }

  getConvenios() {
    return this.firestore.collection('convenios').snapshotChanges();
  }
  addConvenios(paciente) {
    return this.firestore.collection('convenios').add(paciente);
  }
  updateConvenios(paciente, id) {
    return this.firestore.doc('convenios/' + id).update(paciente);
  }
}
