import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaComponent, DialogData } from '../agenda.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();
  @Input() dataAlt;

  constructor(
    public dialogRef: MatDialogRef<AgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  getMessage(event: any){
    this.data = event;
  }
  getAdd(event: any){
    console.log("event", event);
    this.addEvent.emit(event);
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  excluir(event: any){
    this.data.status = "excluir";
  }
  

}
