import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDataServiceComponent } from '../../component/view-data-service/view-data-service.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [CommonModule, ViewDataServiceComponent, RouterModule],
  templateUrl: './view-home.component.html',
  styleUrl: './view-home.component.scss',
})
export class ViewHomeComponent {}
