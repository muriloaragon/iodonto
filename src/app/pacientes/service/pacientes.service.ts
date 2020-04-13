import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private firestore: AngularFirestore) { }

  getPolicies() {
    return this.firestore.collection('pacientes').snapshotChanges();
  }
  getAgendaPaciente() {
    return this.firestore.collection('Agenda').snapshotChanges();
  }
  getAgendaPacienteJuliana() {
    return this.firestore.collection('AgendaJuliana').snapshotChanges();
  }
  updateAgendaPaciente(paciente, id) {
    return this.firestore.doc('Agenda/' + id).update(paciente);
  }
  updateAgendaPacienteJuliana(paciente, id) {
    return this.firestore.doc('AgendaJuliana/' + id).update(paciente);
  }
  addPaciente(paciente) {
    return this.firestore.collection('pacientes').add(paciente);
  }
  updatePaciente(paciente, id) {
    return this.firestore.doc('pacientes/' + id).update(paciente);
  }

}
