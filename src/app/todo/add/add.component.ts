import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

export interface Todo {
  task: string;
  id: number;
  owner_id: number;
  is_completed: boolean;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  @Input() todos: Todo[] = [];
  BASE_URL = 'http://127.0.0.1:8080/';
  token = sessionStorage.getItem('token');
  decodedToken: any;
  todo: string = '';

  constructor(private http: HttpClient) {}

  onTodoAdd(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });

    this.http.post<Todo>(`${this.BASE_URL}todos/create`, { task: this.todo }, { headers }).subscribe(
      (response: Todo) => {
        console.log(response);
        this.todo = '';
        if (this.todos) {
          this.todos.push(response);
        }
      },
      (error) => {
        // this.errorMessage = error.error['detail']; // Assuming the error object contains a 'message' property
        // console.error('Error:', this.errorMessage);
      }
    );
  }
}
