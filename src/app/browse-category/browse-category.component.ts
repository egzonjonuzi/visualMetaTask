import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DataModel} from '../models/data.model';

@Component({
  selector: 'app-browse-category',
  templateUrl: './browse-category.component.html',
  styleUrls: ['./browse-category.component.scss']
})
export class BrowseCategoryComponent implements OnInit {
  categories: DataModel[] = [];
  searchValue = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  getCategories(search): Observable<any> {
    return this.http
      .get<any>('http://localhost:4200/api/categories', {observe: 'response', params: {q: search}})
      .pipe();
  }
  searchCategories(event): void {
    if (event.target.value.length < 3) {
      this.categories = [];
      return;
    }
    this.searchValue = event.target.value;
    this.getCategories(event.target.value).subscribe(
      (resp) => {
        if (resp.status == 200) {
          this.categories = resp.body;
        }
      },
      (err) => console.error(err)
    );
  }
  clickCategory(id) {
    alert('Clicked category id is ' + id);
  }
}
