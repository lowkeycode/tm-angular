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