import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface Todo {
  task: string;
  id: number;
  owner_id: number;
  is_completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  BASE_URL = 'http://127.0.0.1:8080/'

  // todos = ;
  todos: Todo[] = [];
  constructor(private titleService: Title, private http: HttpClient, private router: Router) {}
   ngOnInit(): void {
     this.titleService.setTitle('Todo');
     const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });

    this.http.get(this.BASE_URL+'todos/all', { headers: headers })
      .subscribe(
        (res: any) => {
          console.log(res)
          this.todos = res;
          console.log(this.todos)
        },
        (err: any) => {
          console.error(err);
        }
      );
   }
  handleLogout(){
    alert(sessionStorage.getItem('token'));
    sessionStorage.removeItem('token');
    alert(sessionStorage.getItem('token'));
    this.router.navigate(['/login']);

  }
}
