import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  // @Input() todoInput;
  @Input() todoInput ={} as Todo;

  completed: boolean = false;
  todo={} as Todo;

  constructor(public todoService: TodoService, private toasterService: ToastrService) { }

  ngOnInit(): void {
  }

  onChange() {
    console.log("changed");
    this.completed = !this.completed;
    this.completed ? this.toasterService.success(`Todo succesfully completed`, 'completed') : '';
  }

  onCliCk(e: any) {
    console.log("Clicked");
    console.log(e);
  }

  toggleClass() {
    if (this.completed) {
      // return 'list-item-success';
      return { 'list-group-item-success': this.completed, 'border-primary': this.completed };

    }
    return null
  }

  deleteTodo(item:any) {
    this.todo = item;
    this.todoService.deleteTodo(item);
    this.toasterService.error(`"${item.title.substring(0, 20)}..." Deleted!`, 'Deleted Successfuly');
  }
  isFavorite() {
    // this.todoInput.isFavorite = !this.todoInput.isFavorite;
    // if (this.todoInput.isFavorite) {

    //   this.toasterService.success('Todo Added to Favorite');

    //   this.todoService.fav.unshift(this.todoInput);

    //   localStorage.setItem("favorite", JSON.stringify(this.todoService.fav));

    // }
    // else {
    //   this.toasterService.error('Todo Removed from Favorite');
    //   let index = this.todoService.todoList.indexOf(this.todo);
    //   this.todoService.fav.splice(index, 1);

    //   localStorage.setItem("favorite", JSON.stringify(this.todoService.fav));

    // }
  }

}
