import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styles: []
})
export class TodoFormComponent implements OnInit {

  todo = '';

  constructor(public todoService: TodoService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.todoService.addTodo(this.todo);
    this.todo = '';
    this._router.navigateByUrl('/list');
  }
}
