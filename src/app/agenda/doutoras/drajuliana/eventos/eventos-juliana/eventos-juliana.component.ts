import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaComponent } from 'src/app/agenda/agenda.component';

@Component({
  selector: 'app-eventos-juliana',
  templateUrl: './eventos-juliana.component.html',
  styleUrls: ['./eventos-juliana.component.scss']
})
export class EventosJulianaComponent implements OnInit {
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
  
}
