import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ReactiveFormsModule, JsonPipe],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})

export class TodosComponent {
  todos: Todo[] = [];
  errMessages = false;
  errText = '';
  isModelEditing = false;

  constructor(private todoService: TodoService) {
    this.fetchTodos()
  }

  inputControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  onAddClick() {
    if(this.inputControl.valid) {
      let todo: Todo = { 
        description: this.inputControl.value || '', 
        completed: false,
        isEditing: false 
      };
      this.todoService.add(todo);
      this.inputControl.setValue('');
      this.errMessages = false;
      this.fetchTodos();
    } 
    else {
      this.errMessages = true;
    }
  }

  onDelete(index: number) {
    if(confirm("Confirm changes?")) {
      this.todoService.delete(index);
      this.fetchTodos();
    }
  }

  onEditPanel(index: number) {
    if(this.isModelEditing) {
      this.errText = 'Save changes to edit other todos!';
      return;
    }
    this.todos[index].isEditing = true;
    this.isModelEditing = true;
    this.errText = '';
  }

  onSaveClick(index: number, editingValue: string) {
    if(!confirm("Save changes?")) {
      this.onCancelClick(index);
      return;
    }
    const edited = this.todos[index];
    edited.isEditing = false;
    edited.description = editingValue;
    this.todoService.save(index, edited);
    this.isModelEditing = false;
  }

  onCancelClick(index: number) {
    this.todos[index].isEditing = false;
    this.todos[index] = { ...this.todos[index] };
    this.isModelEditing = false;
    this.errText = '';
  }

  onCompleteChange(todo: Todo, index: number): void {
    this.todoService.save(index, todo);
    this.fetchTodos();
  }

  private fetchTodos(): void {
    this.todos = this.todoService.getAll();
  }
}