
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PacientesService } from 'src/app/pacientes/service/pacientes.service';

export interface User {
  nome: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Output() messageToEmit = new EventEmitter<any>();
  @Output() add = new EventEmitter<string>();
  refresh: any;

  myControl = new FormControl();
  // options: User[] = [
  //   {nome: 'Mary'},
  //   {nome: 'Shelley'},
  //   {nome: 'Igor'}
  // ];
  constructor(private pacientes: PacientesService) { }
  paciente: any;
  options: User[];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.pacientes.getPolicies()
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
        this.options = this.paciente;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nome),
            map(nome => nome ? this._filter(nome) : this.options.slice())
          );
      });
  }

  displayFn(user: User): string {
    return user && user.nome ? user.nome : '';
  }

  emitEvent(nome: any) {
    const filterValue = nome.toLowerCase();
    let obj: any = this.options.filter(option =>
      option.nome.toLowerCase().indexOf(filterValue) === 0);
      console.log(obj);
      let filter = {
        nome: obj[0].nome,
        idPaciente: obj[0].id
      }
    this.messageToEmit.emit(filter);
    return;
  }

  private _filter(nome: string): User[] {
    const filterValue = nome.toLowerCase();
    console.log("filter", this.options);
    this.emitEvent(nome);
    return this.options.filter(option =>
      option.nome.toLowerCase().indexOf(filterValue) === 0);
  }
  addEvent() {
    this.add.emit(this.myControl.value)
  }
  getRefresh(event: any) {
    console.log(event);
    this.paciente = JSON.parse(localStorage.getItem("Pacientes"));
    this.options = this.paciente;
    this.ngOnInit();
  }
}
