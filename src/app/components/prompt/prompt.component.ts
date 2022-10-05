import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog()
  {
    this.dialogRef.open(PromptComponent);
  }

}
