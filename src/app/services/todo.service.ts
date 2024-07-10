import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";

@Injectable({
    providedIn: 'root',
})

export class TodoService {
    setAll(todos: Todo[]){
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    getAll(check?: boolean): Todo[] {
        const allTodos = JSON.parse(localStorage.getItem('todos') ?? '[]') as Todo[];

        if(check !== undefined) {
            const filteredTodos = allTodos.filter(todo => todo.completed === check);
    
            return filteredTodos;
        }

        return allTodos;
    }

    add(todo: Todo): void {
        let todos = this.getAll(false);
        todos.unshift(todo);
        this.setAll(todos);
    }

    delete(id: number): void {
        let todos = this.getAll();

        const toDelete = todos.find(todo => todo.id === id);
        const index = todos.findIndex(todo => todo.id == toDelete?.id);
        
        todos.splice(index, 1);
        this.setAll(todos);
    }

    save(edited: Todo): void {
        let todos = this.getAll();

        const toEdit = todos.find(todo => todo.id === edited.id);
        const index = todos.findIndex(todo => todo.id == toEdit?.id);
        
        todos[index] = edited;
            

        this.setAll([...todos]);
    }
}