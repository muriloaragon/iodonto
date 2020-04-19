import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AnotacoesComponent } from '../anotacoes.component';

@Component({
  selector: 'app-add-anotacoes',
  templateUrl: './add-anotacoes.component.html',
  styleUrls: ['./add-anotacoes.component.scss']
})
export class AddAnotacoesComponent implements OnInit {

  date: any;
  descricao: any;

  constructor(
    public dialogRef: MatDialogRef<AnotacoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

    anotacoesForm = this.fb.group({
    date: ['', Validators.required],
    descricao: ['', Validators.required]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
