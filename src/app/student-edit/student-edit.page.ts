import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.page.html',
  styleUrls: ['./student-edit.page.scss'],
})
export class StudentEditPage implements OnInit {

  id: number;
  data: Student;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService) {
      this.data = new Student();
    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    //pega detalhes do item usando id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  update() {
    //Atualiza o item pegando id e objeto de dados atualizado
    console.log(this.id);
    console.log(this.data);
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      console.log(response);
      this.router.navigate(['student/list']);
    });
  }
}
