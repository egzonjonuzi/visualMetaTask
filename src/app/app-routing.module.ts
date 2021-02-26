import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddCategoryComponent} from './add-category/add-category.component';
import {BrowseCategoryComponent} from './browse-category/browse-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-categories',
    pathMatch: 'full'
  },
  {
    path: 'add-categories',
    component: AddCategoryComponent,
  },
  {
    path: 'browse-categories',
    component: BrowseCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
