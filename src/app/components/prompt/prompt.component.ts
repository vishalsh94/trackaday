import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  qoute: String | any;
  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.qoute = this.getQoute();
  }

  // openDialog(){
  //   this.dialogRef.open(PromptComponent);
  // }
  
  qoutes = [
    "Good Work!!", 
    "Keep it up!! you are doing great.",
    "Nothing is impossible",
    "Stay Hydrated !!",
    "Dont Give up You can achieve it",
    "Dont Wish for it Work for it",
    "Dont let yesterday take too much of today",
    "It mightnot be easy but it'll be worth it",
    "Believe you can and you are halfway there",
    "Stay Hopeful",
    "Make each day your masterpiece",
    "Dont stop Keep Going",
    "Focus",
    "Be a voice not an echo"
  ]

  public getQoute(){
    var randomIndex = Math.floor(Math.random() * this.qoutes.length)
    return this.qoutes[randomIndex]
  }

  closePrompt(){
    this.dialogRef.closeAll();
  }

}
