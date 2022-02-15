import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text: string;
  day: string;
  reminder: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.text) {
      return alert('Please add a task');
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.text = this.day = '';
    this.reminder = false;

    this.onAddTask.emit(newTask);
  }

}
