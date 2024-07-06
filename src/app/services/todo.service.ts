import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { DOCUMENT } from "@angular/common";

@Injectable({
    providedIn: 'root',
})

export class TodoService {
    setAll(todos: Todo[]){
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    getAll(): Todo[] {
        return JSON.parse(localStorage.getItem('todos') ?? '[]') as Todo[];
    }

    add(todo: Todo): void {
        let todos = this.getAll();
        todos.unshift(todo);
        this.setAll(todos);
    }

    delete(index: number): void {
        let todos = this.getAll();
        todos.splice(index, 1);
        this.setAll(todos);
    }

    save(index: number, edited: Todo): void {
        let todos = this.getAll();
        todos[index] = edited;
        this.setAll(todos);
    }
}