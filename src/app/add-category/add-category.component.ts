import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryValue: string;
  error = false;
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  addCategory(categoryValue): Observable<any> {
    return this.http
      .post<any>('http://localhost:4200/api/categories', {categoryValue})
      .pipe();
  }

  addCategoryInServer(): void {
    this.addCategory(this.categoryValue).subscribe(
      (resp) => {

          if(resp === 200){
            this.openSnackBar('Category succesfully inserted', '');
            this.router.navigate(['/browse-categories']);
            this.error = false;
          } else {
            this.error = true;
          }
      },
      (err) => {
       this.error = true;
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
