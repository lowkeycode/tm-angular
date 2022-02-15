# Traversy Media Angular Course


Advantages of angular:

- Much more full featured than react or vue so more is included in the core framework
- Larger framework = steeper learning curve
- Integrated TypeScript
- RxJS - allows for async programming with Observables
- Test friendly
- Used for enterprise applications as it is more strict

Components:

- Class based

Services:

- Separate from components to increase modularity and reuseability

- Usually built to deal one task or aspect of the application Ex.) Fetching data, validation etc.

CLI:

- Dev server
- Easily generate components


In the app.module.ts we add any part of the angular that we want to use Ex.) Forms & https we import and list them in the imports to get access.

String Interpolation is used with the {{}} syntax and can take any JS expression.

Constructors run whenever the component is initialized

ngOnInit is a lifecycle method that is generally used instead of the constructor.

Decorators define fields on classes.

You can use component input data using the Input decorator, which can be similar to props in react to pass data to a reusable component.

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
```

```html
<header>
  <h1>{{ title }}</h1>
  <app-button color="green" text="Add"></app-button>
</header>
```

```html
<button [ngStyle]="{backgroundColor: color}" class="btn">{{ text }}</button>
```

We can also define custom functions on custom events with the Output decorator. Here we set it to a new event emitter.

button component
```html
<button [ngStyle]="{backgroundColor: color}" class="btn" (click)="onClick()">{{ text }}</button>
```

header component
```html
<header>
  <h1>{{ title }}</h1>
  <app-button color="green" text="Add" (btnClick)="toggleAddTask()"></app-button>
</header>
```

button component
```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() color: string;

  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.btnClick.emit();
  }

}
```

Moving forward we have some mock data set up until we can get some from JSON server that looks like this...

```ts
import { Task } from './Task';

export const TASKS: Task[] = [
  {
    id: 1,
    text: 'Doctors Appointment',
    day: 'May 5th at 2:30pm',
    reminder: true,
  },
  {
    id: 2,
    text: 'Meeting at School',
    day: 'May 6th at 1:30pm',
    reminder: true,
  },
  {
    text: 'Food Shopping',
    day: 'May 7th at 12:30pm',
    reminder: false,
  },
];
```

We can create interfaces that act as models for our defined data structures. An interface is like a type for a class and we can set the types that we want REQUIRED on that class. We can also use the ? syntax to define valuse as optional.

task interface (named as Task.ts)
```ts
export interface Task {
  id?: number;
  text: string;
  day: string;
  reminder: boolean;
}
```

We set our tasks array of type Task to be our mock data so we can loop over.

tasks component
```ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';

import { TASKS } from 'src/app/mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = TASKS;

  constructor() { }

  ngOnInit(): void {
  }

}
```

Then we start defining our reusable component and the properties we pass into it. Here we are going to have a task-item component rendered for each task of the tasks array in the tasks component. And we pass the task object into each component that we got from the tasks array to use inside that component.

task component
```html
<app-task-item *ngFor="let task of tasks" [task]="task">{{ task.text }}</app-task-item>
```

Make sure we connect it by saying we'll take a task into the component with the Input decorator

task-item component
```ts
import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
```
And build how we want it to look.

task-item
```html
<div class="task">
  <h3>{{ task.text }}</h3>
  <p>{{ task.day }}</p>
</div>
```

Services:

Services can be created from the CLI just as a component.

ng g s services/task

A service is a class that imports an Injectable decorator which marks it as available to be provided as an injectable dependency.

task service
```ts
import { Injectable } from '@angular/core';
import { Task } from '../Task';

import { TASKS } from 'src/app/mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    return TASKS;
  }
}

```

Then we bring our service into our component to use. To be able to use it here you need to add it as a PROVIDER into the constructor of the component.

So now we are getting the file information from the mocks using a service. Services are usually used alongside observables in situations like this where we would be asynchronously fetching data.

task component
```ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

}
```


To make it an observable we import the observable into the service. Then on our function we define that we want it to return an observable that we can later subscribe to. The course doesn't really explain the of() function...

task service
```ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from '../Task';

import { TASKS } from 'src/app/mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }
}
```
The we subscribe to the getTasks which is an observable and is sort of similar to a promise where we can handle the result.


Currently this doesn't function any different then before but behind the scenes we know it is working differently.

task component
```ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  privateApiUrl = 'http://localhost:4300/tasks';

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

}
```

Some methods like the angular http client will automatically return an observable so we don't always manually define them.

Here we can get rid of the of() method as well as the mock tasks.

Then our services get task observable makes an http call to our backend at the define url which is called when the component renders initially from the ngOnInit when we subscribe to it and set the tasks array to the data from the back end

task service
```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Task } from '../Task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }
}
```


Deleting:

We set up our task item to have an onDelete method that takes in the taskon click

task item
```html
<div class="task">
  <h3>
    {{ task.text }}
    <fa-icon (click)="onDelete(task)" [icon]="faTimes"></fa-icon>
  </h3>
  <p>{{ task.day }}</p>
</div>
```

Then we ensure we give it the output decorator defining the custom function with an event emitter. Then call that event emitter in the onDelete method

task item
```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;

  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task) {
    this.onDeleteTask.emit(task);
  }
}
```

Then we bind to that custom event and call a delete task function which also takes in that given task

tasks component
```html
<app-task-item *ngFor="let task of tasks" [task]="task" (onDeleteTask)="deleteTask(task)">{{ task.text }}</app-task-item>
```

then we define the method on our service to delete from out db using an http observable.

task service
```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Task } from '../Task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
}

```

And we wire them together with the deleteTask method on our component which takes in that task and uses the services observable, subscribes to it, which then deletes that task in the db and we can from that return a filtered array without that task to populate our tasks array to ensure that task is also deleted from the UI.

tasks component
```ts
deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id !== task.id));
  }
```