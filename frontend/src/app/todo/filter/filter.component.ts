import { Component, Input, DoCheck, ChangeDetectionStrategy } from '@angular/core';

export interface Todo {
  task: string;
  id: number;
  owner_id: number;
  is_completed: boolean;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements DoCheck {
  @Input() todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  filter = 'all';
  completedCount: number = 0;
  incompletedCount: number = 0;

  ngDoCheck() {
    this.filterTodos();
  }

  completedTodos() {
    this.completedCount = this.todos.filter((todo) => todo.is_completed).length;
    return this.completedCount;
  }

  incompletedTodos() {
    this.incompletedCount = this.todos.filter((todo) => !todo.is_completed).length;
    return this.incompletedCount;
  }

  filterTodos() {
    if (this.filter === 'active') {
      this.filteredTodos = this.todos.filter((todo) => todo.is_completed);
    } else if (this.filter === 'inactive') {
      this.filteredTodos = this.todos.filter((todo) => !todo.is_completed);
    } else {
      this.filteredTodos = this.todos;
    }
  }

  setFilter(filter: string) {
    console.log(this.completedTodos(), this.incompletedTodos())
    console.log(this.todos)
    this.filter = filter;
    this.filterTodos();
    this.completedTodos();
    this.incompletedTodos();
  }
}
