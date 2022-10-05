import { Component } from '@angular/core';
import { PromptComponent } from './components/prompt/prompt.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trackaday';

  constructor(private dialogRef: MatDialog) { }

  ngOnInit()
  {
    setInterval(() => {
      this.openDialog();},60000)
  }

  openDialog()
  {
    this.dialogRef.open(PromptComponent);
  }



}
