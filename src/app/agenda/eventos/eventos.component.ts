import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaComponent, DialogData } from '../agenda.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  @Output() addEvent = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<AgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  getMessage(event: any){
    this.data = event;
    console.log(event);
  }
  getAdd(event: any){
    console.log("event", event);
    this.addEvent.emit(event);
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
  }
  

}
