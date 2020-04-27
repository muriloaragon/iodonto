import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AutocompleteComponent } from '../shared/autocomplete/autocomplete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacientesService } from './service/pacientes.service';
import { AgendaService } from '../agenda/service/agenda.service';
import { takeWhile } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';

export interface DialogData {
  nome: string;
  email: string;
  telefone: string;
  celular: string;
  convenio: string;
  numeroConvenio: string;
  dataPrimeirConsulta: Date;

}


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit, OnDestroy {
  @ViewChild(AutocompleteComponent, { static: false }) child: any;
  ObjectoSel: any;
  private alive: boolean = true;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private paciente: PacientesService, private agenda: AgendaService, private loadingBar: LoadingBarService) { }

  pacienteForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
    celular: ['', Validators.required],
    convenio: ['', Validators.required],
    numeroConvenio: ['', Validators.required],
    dataPrimeiraConsulta: ['', Validators.required],
    dataNascimento: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  Alterar() {
    this.paciente.addPaciente(this.pacienteForm.value);
  }

  submitForm() {
    this.loadingBar.start();
    if (this.ObjectoSel === undefined) {
      this.paciente.addPaciente(this.pacienteForm.value);
      this.loadingBar.complete();
      this.openSnackBar("Paciente Adicionado com sucesso!", "Fechar")
    } else {
      this.paciente.updatePaciente(this.pacienteForm.value, this.ObjectoSel.id);
      this.openSnackBar("Paciente Salvo com sucesso!", "Fechar")
      this.salvarAgenda(this.ObjectoSel.id, this.pacienteForm.value);
      this.salvarAgendaJuliana(this.ObjectoSel.id, this.pacienteForm.value);
      this.loadingBar.complete();
    }
    this.pacienteForm.reset();
  }
  salvarAgenda(id: any, nome: any) {
    let serviceCount: any = 0;
    let objA: any;
    this.paciente.getAgendaPaciente()
      .subscribe((data: any) => {
        objA = data.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            end: e.payload.doc.data()['end'],
            start: e.payload.doc.data()['start'],
            idPaciente: e.payload.doc.data()['idPaciente']
          };
        })
        let obj: any = objA.filter(option =>
          option.idPaciente.toLowerCase().indexOf(id));
        if (serviceCount < obj.length) {
          obj.forEach(element => {
            if (element.idPaciente == id) {
              let objAlterado = {
                "end": element.end,
                "start": element.start,
                "idPaciente": element.idPaciente,
                "title": nome.nome
              }
              this.paciente.updateAgendaPaciente(objAlterado, element.id)
              serviceCount++;
            }
          });
        }
      })
  }
  salvarAgendaJuliana(id: any, nome: any) {
    let serviceCount: any = 0;
    let objA: any;
    this.paciente.getAgendaPacienteJuliana()
      .subscribe((data: any) => {
        objA = data.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            end: e.payload.doc.data()['end'],
            start: e.payload.doc.data()['start'],
            idPaciente: e.payload.doc.data()['idPaciente']
          };
        })
        let obj: any = objA.filter(option =>
          option.idPaciente.toLowerCase().indexOf(id));
        if (serviceCount < obj.length) {
          obj.forEach(element => {
            if (element.idPaciente == id) {
              let objAlterado = {
                "end": element.end,
                "start": element.start,
                "idPaciente": element.idPaciente,
                "title": nome.nome
              }
              this.paciente.updateAgendaPacienteJuliana(objAlterado, element.id)
              serviceCount++;
            }
          });
        }
      })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getAdd(event: any) {
    this.ObjectoSel = event;
    this.pacienteForm.patchValue({
      nome: event.nome,
      email: event.email,
      telefone: event.telefone,
      celular: event.celular,
      convenio: event.convenio,
      numeroConvenio: event.numeroConvenio,
      dataPrimeiraConsulta: event.dataPrimeiraConsulta,
      dataNascimento: event.dataNascimento
    })
  }
  public ngOnDestroy() {
    this.alive = false;
  }

}
