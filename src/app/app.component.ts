import { Component } from '@angular/core';
import { AppData } from './models/appData';
import { DataKey } from './models/dataKey';
import { Session } from './models/session';
import { Todo } from './models/todo';
const electron = (<any>window).require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trackaday';

  appData: AppData;
  isReading: boolean;

  constructor(){
    this.isReading = false;
    this.appData = new AppData();
    this.readAppData(DataKey.ALL_KEY);
  }

  ngOnInit()
  { }

  saveSessionData(sessionData: Session[]) {
    this.appData.session = sessionData;
    electron.ipcRenderer.send("save-data-session", JSON.stringify(sessionData));
  }

  saveTodoData(todoData: Todo[]) {
    this.appData.tasks = todoData;
    electron.ipcRenderer.send("save-data-todo", JSON.stringify(todoData));
  }

  readAppData(key: DataKey) {
    this.isReading = true;
    console.log("trying to read data")
    return new Promise(resolve=> {
      electron.ipcRenderer.send('read-data', key)

      electron.ipcRenderer.once('read-data-reply', (event: any, result: any)=>{
        resolve(result);
        this.readCallback(key, result);
      })
    })
  }

  readCallback(key: DataKey, data: any){
    console.log("key:" + key + "\ndata:" + JSON.stringify(data));
    if(key == DataKey.SESSION_KEY){
      this.appData.session = data == "" ? data : JSON.parse(data);
    } else if (key == DataKey.TODO_KEY){
      this.appData.tasks = data == "" ? data : JSON.parse(data);
    } else if (key == DataKey.ALL_KEY){
      this.appData.tasks = data.tasks == "" ? data.tasks : JSON.parse(data.tasks);
      this.appData.session = data.session == "" ? data.session : JSON.parse(data.session);
    }

    this.isReading = false;
  }
}
