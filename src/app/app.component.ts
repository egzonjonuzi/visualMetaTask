import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'visualMetaTask';

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
       this.initializeCategoriesInServer();
    }


  getAllCategories(): Observable<any> {
    return this.http
      .get<any>('http://localhost:4200/', {observe: 'response'})
      .pipe();
  }

  initializeCategoriesInServer(): void {
    this.getAllCategories().subscribe(
      (resp) => {},
      (err) => console.error(err)
    );
  }
}

