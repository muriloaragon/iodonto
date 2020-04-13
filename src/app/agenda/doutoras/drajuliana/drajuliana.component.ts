import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';
import allLocales from '@fullcalendar/core/locales-all';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { EventosComponent } from '../../eventos/eventos.component';
import { AgendaService } from '../../service/agenda.service';
export interface DialogData {
  title: string;
  start: string;
  end: string;
  date: Date;
}

@Component({
  selector: 'app-drajuliana',
  templateUrl: './drajuliana.component.html',
  styleUrls: ['./drajuliana.component.scss']
})
export class DrajulianaComponent {

  optionsTeste: OptionsInput;
  eventsModel: any;
  start: string;
  title: string;
  end: string;
  draggableEl: any;
  events: any;
  calendarEvents: any
  @Input() addEvent: string;
  @Output() addAgenda = new EventEmitter<string>();
  eventA: any = [];
  load: any = true;

  @ViewChild('fullcalendar2') fullcalendar2: CalendarComponent;
  constructor(public dialog: MatDialog, private agendaService: AgendaService) { }
  ngOnInit() {
    this.serviceAgenda();
  }
  serviceAgenda() {
    this.load = true;
    this.agendaService.getAgendaJuliana()
      .subscribe((data: any) => {
        this.eventA = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            title: e.payload.doc.data()['title'],
            end: e.payload.doc.data()['end'],
            start: e.payload.doc.data()['start']
          };
        })
        this.calendarEvents = this.eventA;
        this.calender();
      })
  }
  calender() {
    this.draggableEl = document.getElementById("mydraggable");
    this.optionsTeste = {
      editable: true,
      eventLimit: true,
      locale: 'pt-br',
      timeZone: 'America/Sao_Paulo',
      droppable: true, // this allows things to be dropped onto the calendar
      header: {
        left: 'prev,next',
        center: 'title,',
        right: 'clickButtonTest'
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      selectable: true,
      customButtons: {
        clickButtonTest: {
          text: 'Adicionar',
          click: function () {
          }
        },
        clickButtonSalvar: {
          text: 'Salvar',
          click: function () {
          }
        }
      },      
      events: this.eventA,
    };
    this.load = false;
  }
  clearEvents() {
    this.eventsModel = [];
  }
  loadEvents() {
    this.eventsModel = []
  }

  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
  clickButtonTest(event: any) {
    console.log(event);
    if (event == 'clickButtonTest')
      this.openDialog();
    if (event == 'clickButtonSalvar') { }
  }
  
  openDialog(): void {

    const dialogRef = this.dialog.open(EventosComponent, {
      width: '400px',
      data: {
        name: this.title,
        start: this.start, end: this.end
      }
    });
    dialogRef.keydownEvents().subscribe(result => {
      console.log("result", result);
    })

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {
        var datePipe = new DatePipe('en-US')
        let dateT = datePipe.transform(result.date, 'yyyy-MM-dd')
        this.calendarEvents = this.calendarEvents.concat( // creates a new array!
          { title: result.nome, start: dateT + 'T' + result.start + ":00", end: result.end }
        );
        console.log(result);
        let objEvent: any = {
          "title": result.nome,
          "start": dateT + 'T' + result.start + ":00",
          "end": result.end,
          "idPaciente": result.idPaciente
        }
        this.agendaService.addAgendaJuliana(objEvent);
        this.serviceAgenda();
      } else {
        this.addAgenda.emit("pacientes");
      }
    });
  }
  eventDragStop(model) {
    console.log("aqui", model);
  }
  eventClick(model) {
    console.log("aqui 2", model);
  }
  updateEvent(elemnt: any) {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }

}
