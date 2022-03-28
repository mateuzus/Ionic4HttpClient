import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentsData: any;

  constructor(public apiService: ApiService) {
    this.studentsData = [];
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.studentsData = response;
    });
  }

  delete(item) {
    this.apiService.deleteItem(item.id).subscribe(response => {
      console.log(response);
      this.getAllStudents();
    });
  }

}
