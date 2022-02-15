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

