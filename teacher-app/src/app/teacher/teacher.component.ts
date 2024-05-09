import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { TeacherService} from '../service/teacher.service'
import { Teacher } from '../class/teacher';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit {
  teachers: any
  teacher = new Teacher
  newTeacherRequestBody;
  p: number = 1;

  constructor(
    private service: TeacherService,
    private fromBuilder: FormBuilder,
  ){}

  ngOnInit() {
    this.getTeacherList();
  }

  getTeacherList(){
    this.service.getTeachers().subscribe((res)=>{
      this.teachers = res;
      console.log(res);
    }),
    error =>{
      console.log(error);
    }
  };

  teacherFG = this.fromBuilder.group(
    {
      fname:['', Validators.required],
      lname:['', Validators.required],
    }
  )

  saveTeacher(data){
    this.newTeacherRequestBody={
      fname: data?.fname,
      lname: data?.lname,
    }
    this.service.saveTeacher(this.newTeacherRequestBody).subscribe((payload)=>{
      if(payload !== null){
        Swal.fire("Teacher Added Successfully").then((result)=>{
          if(result.isConfirmed){
            location.reload();
          }
        })
      } else{
        Swal.fire('Error occured & Teacher name is not saved').then((result)=>{
          if(result.isConfirmed){
            location.reload()
          }
        })
      }
    })
  }
}
