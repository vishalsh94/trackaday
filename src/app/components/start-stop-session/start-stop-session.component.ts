import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PromptComponent } from '../prompt/prompt.component';

const timerMessages = {
  start: 'Let the countdown begin!!',
  running: 'Greatness is within sight!!',
  stop: 'Never quit keep going!!'
};

enum Status {
    STOP = 'STOP',
    PAUSE = 'PAUSE',
    RUNNING = 'RUNNING'
};

const TOTAL_SECONDS = 0;

@Component({
  selector: 'app-start-stop-session',
  templateUrl: './start-stop-session.component.html',
  styleUrls: ['./start-stop-session.component.scss']
})
export class StartStopSessionComponent implements OnInit {

  message: string = '';
  strHours: string = '';
  strMinutes: string = '';
  strSeconds: string = '';
  totalSeconds: number = TOTAL_SECONDS;
  timerId: any = null;
  status = Status.STOP;
  promptComponent: PromptComponent | undefined;

  constructor(private dialogRef: MatDialog) { }

  ngOnInit() {
    this.message = timerMessages.start;
    this.displayTime();
  }

  countdown() {

    this.timerId = setInterval(() => {
    this.totalSeconds += 1;
    console.log(this.totalSeconds);
    this.displayTime();    }, 1000);

  }


  displayTime() {
    const seconds = this.totalSeconds % 60;
    const minutes = Math.floor((this.totalSeconds / 60) % 60);
    const hours = Math.floor(this.totalSeconds / 3600);

    this.strHours = (hours < 10) ? `0${hours}` : `${hours}`;
    this.strMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    this.strSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;;
  }

  startTimer() {
    this.setStatus(Status.RUNNING);
    this.countdown();
    this.startCheckpointTimerLoop();
  }

  startCheckpointTimerLoop() {
    this.openDialog();
    // setInterval(() => {
    //   this.openDialog();},3600000)
  }

  pauseTimer() {
    clearInterval(this.timerId);
    this.setStatus(Status.PAUSE);
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.setStatus(Status.STOP);
    this.displayTime()
  }

  setStatus(newStatus: Status) {
    this.status = newStatus;
    switch (newStatus) {
      case Status.STOP:
        this.message = timerMessages.start;
        this.totalSeconds = TOTAL_SECONDS;
        break;
      case Status.RUNNING:
        this.message = timerMessages.running;
        break;
      case Status.PAUSE:
        this.message = timerMessages.stop;
        break;
      default:
        break;
    }
  }

  openDialog()
  { 
    this.dialogRef.closeAll()
    this.dialogRef.open(PromptComponent);
  }
}
