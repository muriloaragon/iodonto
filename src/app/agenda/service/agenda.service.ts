import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private firestore: AngularFirestore) { }

  getAgenda() {
    return this.firestore.collection('Agenda').snapshotChanges();
  }
  getAgendaJuliana() {
    return this.firestore.collection('AgendaJuliana').snapshotChanges();
  }
  addAgendaJuliana(paciente) {
    return this.firestore.collection('AgendaJuliana').add(paciente);
  }
  addAgenda(paciente) {
    return this.firestore.collection('Agenda').add(paciente);
  }
  updateAgenda(paciente, id) {
    return this.firestore.doc('Agenda/' + id).update(paciente);
  }
  updateAgendaJuliana(paciente, id) {
    return this.firestore.doc('AgendaJuliana/' + id).update(paciente);
  }
  removeAgenda(id) {
    return this.firestore.doc('Agenda/' + id).delete();
  }
  removeAgendaJuliana(id) {
    return this.firestore.doc('AgendaJuliana/' + id).delete();
  }
}
