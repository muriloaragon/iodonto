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
  start: any;
  end: string;
  date: Date;
  idPaciente: string;
}

@Component({
  selector: 'app-drajuliana',
  templateUrl: './drajuliana.component.html',
  styleUrls: ['./drajuliana.component.scss']
})
export class DrajulianaComponent implements OnInit {
  optionsTeste: OptionsInput;
  eventsModel: any;
  start: any;
  title: string;
  end: string;
  draggableEl: any;
  events: any = [];
  calendarEvents: any = [];
  tab: any = 0;
  @Input() addEvent: string;
  @Output() addAgenda = new EventEmitter<string>();
  @Output() dataAlt;
  eventA: any = [];
  load: any = true;

  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  constructor(public dialog: MatDialog, private agendaService: AgendaService) { }
  ngOnInit() {
    this.serviceAgenda();
  }
  serviceAgenda() {
    this.load = true;
    this.agendaService.getAgenda()
      .subscribe((data: any) => {
        this.eventA = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            title: e.payload.doc.data()['title'],
            end: e.payload.doc.data()['end'],
            start: e.payload.doc.data()['start'],
            groupId: e.payload.doc.data()['idPaciente']
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
      this.openDialog("novo", "", "");
    if (event == 'clickButtonSalvar') { }
  }

  openDialog(alt, id, idPaciente): void {
    this.dataAlt = alt;
    const dialogRef = this.dialog.open(EventosComponent, {
      width: '400px',
      data: {
        status: alt,
        name: this.title,
        start: this.start,
        end: this.end,
        id: id,
        idPaciente: idPaciente
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
        if (result.status == "novo") {
          let objEvent: any = {
            "title": result.nome,
            "start": dateT + 'T' + result.start + ":00",
            "end": result.end,
            "idPaciente": result.idPaciente
          }
          this.agendaService.addAgenda(objEvent);
        }
        if (result.status == "Alterar") {
          let objEvent: any = {
            "end": result.end,
            "idPaciente": result.idPaciente,
            "start": dateT + 'T' + result.start + ":00",
            "title": result.name            
          }
          console.log(objEvent);
          this.agendaService.updateAgenda(objEvent, id)
        }
        
        this.serviceAgenda();
      } else {
        this.addAgenda.emit("pacientes");
      }
    });
  }
  eventClickInfo(model) {
    console.log("aqui 3", model);
  }
  eventDragStop(model) {
    console.log("aqui", model);
  }
  eventClick(model) {
    let alt = "Alterar";
    this.title = model.event.title;
    this.end = model.event.end;
    this.start = model.event.start;
    this.openDialog(alt, model.event.id, model.event.groupId);
  }
  updateEvent(elemnt: any) {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      end: this.yearMonth + '-10'
    }];
  }

  changeTab(event: any) {
    this.tab = event.index;
  }
}

