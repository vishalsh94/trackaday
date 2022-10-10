import { ApplicationRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AppComponent } from '../app.component';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  sessionList: Session[] = [];
  appComponent: AppComponent;
  appRef: ApplicationRef;

  private sessionReplay: ReplaySubject<Session[]> = new ReplaySubject<Session[]>(0);

  constructor(appComponent: AppComponent, appRef: ApplicationRef) {
    this.appComponent = appComponent;
    this.appRef = appRef;
    this.readDataStore();
   }

   saveSessionData(session:Session){
    this.sessionList.push(session);
    this.save();
   }

   async readDataStore(){
    while(this.appComponent.isReading){
      await this.delay(10);
    }
    this.sessionList = this.appComponent.appData.session;
    this.sessionReplay.next(this.sessionList);
    console.log("Updated appData: "+this.sessionList[0]);
    this.appRef.tick();
   }

   waitForData():Observable<Session[]>{
    return this.sessionReplay;
   }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
   }

   save(){
    this.appComponent.saveSessionData(this.sessionList);
  }
}
