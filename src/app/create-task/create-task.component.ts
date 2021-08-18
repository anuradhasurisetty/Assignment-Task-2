import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  postForm!: FormGroup;
  submitted!: boolean;
  // tasks: any = [];
  status: any = ["Open","InProgress","Completed"];
  taskList: any = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  addDummyData(){
    let data = [
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
    this.taskList = data;
    localStorage.setItem('tasksList', JSON.stringify(this.taskList));
  }

  createForm(){
    this.postForm = this.fb.group({
      id: [''],
      title: ['',Validators.required],
      description: [''],
      status: ['',Validators.required],
      date: ['']
    })
    this.submitted = false;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.postForm.valid){
      return;
    }
    
    console.log(this.postForm.value);
    // let obj  = {
    //   ...this.postForm.getRawValue()
    // }
    // this.tasks.push(obj);
    // console.log(this.tasks);
    let users = [];
    
    if (localStorage.getItem('tasksList')) {
      users = JSON.parse(localStorage.getItem('tasksList') || '{}');
      this.postForm.get('id')?.patchValue(users.length + 1);
      users = [this.postForm.getRawValue(), ...users];
    } else {
      users = [this.postForm.getRawValue()];
    }
    localStorage.setItem('tasksList', JSON.stringify(users)); //local storage//
    // localStorage.setItem('tasksList', JSON.stringify(this.tasks));
    alert("Created Successfully");
    this.createForm();
  }

}
