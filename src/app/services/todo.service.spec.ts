import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

import { ToastrModule } from 'ngx-toastr';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      ToastrModule.forRoot() // added this works for me
  ]});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
