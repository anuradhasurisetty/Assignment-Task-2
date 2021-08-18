import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  todo: any = [
    // 'Get to work',
    // 'Pick up groceries',
    // 'Go home',
    // 'Fall asleep'
  ];

  workInProgress: any = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
    // 'Walk dog'
  ];
  completed: any = [
    // 'Brush teeth c',
    // 'Take a shower c',
  ]
  taskList: any = [
    {
      id: 1,
      title: 'titels1',
      description: 'desc1',
      status: 'Open'
    },
    {
      id: 2,
      title: 'titels2',
      description: 'desc1',
      status: 'Open'
    },
    {
      id: 3,
      title: 'titels3',
      description: 'desc1',
      status: 'InProgress'
    },
    {
      id: 4,
      title: 'titels4',
      description: 'desc1',
      status: 'InProgress'
    },
    {
      id: 5,
      title: 'titels5',
      description: 'desc1',
      status: 'InProgress'
    }
  ];
  
  constructor() { 
    
  }

  ngOnInit(): void {
    
    this.taskList = JSON.parse(localStorage.getItem('tasksList') || '');
    console.log(this.taskList);
    this.taskList.forEach((element: any) => {
      switch(element.status){
        case "Open":
          this.todo.push(element);
          break;
        case "InProgress":
          this.workInProgress.push(element);
          break;
        case "Completed":
          this.completed.push(element);
          break;
      }
    });
  }
  drop(event: CdkDragDrop<string[]>,statusType?: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
  let ind = this.taskList.findIndex((s: any) => s === event.container.data[event.currentIndex]);
  // this.taskList.map((res:any,i: any) => {
  //   if (i = ind) {
  //     res.status = statusType;
  //   }
  //   return res;
  // });
  this.taskList[ind].status = statusType;
  localStorage.setItem('tasksList', JSON.stringify(this.taskList));

    }
  }
}
