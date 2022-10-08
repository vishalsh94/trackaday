import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';

import { ToastrModule } from 'ngx-toastr';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      imports: [
        ToastrModule.forRoot() // added this works for me
    ]})
    .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
