import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';

export interface Todo {
  task: string;
  id: number;
  owner_id: number;
  is_completed: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() todos: Todo[] = [];
  BASE_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  handleTodoCompletion(id: number, is_completed: boolean) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });

    const params = new HttpParams().set('is_completed', String(is_completed));

    this.http
      .put<any>(`${this.BASE_URL}todos/update/${id}`, {}, { headers: headers, params: params })
      .subscribe(
        (response) => {
          // console.log(response);
          this.removeTodoById(id,response); // Removing the todo item from the list after successful completion
        },
        (error) => {
          console.log(error);
        }
      );
  }

  removeTodoById(id: number, response:Todo) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === id) {
        this.todos.splice(i, 1); // Using splice to remove the item from the todos array
        this.todos.push(response)
        break; // Exit the loop once the item is removed
      }
    }
  }

  handleLog(id: number, name: string) {
    console.log(id, name);
  }
}
