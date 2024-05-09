import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../model/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8080/teacher/'

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<any>{
    return this.http.get(this.baseUrl+"list");
  }

  saveTeacher(teacher: Teacher){
    return this.http.post(this.baseUrl+"save",teacher);
  }
}
