import { Component, OnInit, Inject } from '@angular/core';
import { ConveniosComponent, DialogData } from '../convenios.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-convenios',
  templateUrl: './add-convenios.component.html',
  styleUrls: ['./add-convenios.component.scss']
})
export class AddConveniosComponent implements OnInit {
  nome: string;
  email: string;
  telefone: string;
  site: string;

  constructor(
    public dialogRef: MatDialogRef<ConveniosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) { }

    convenioForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required],
    site: ['', Validators.required]
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
