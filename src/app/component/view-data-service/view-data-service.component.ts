import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../service/data.service';
import { User } from '../../core/interfaces/user';
import { HttpClientModule } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-view-data-service',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './view-data-service.component.html',
  styleUrl: './view-data-service.component.scss',
  providers: [DataService],
})
export class ViewDataServiceComponent implements OnInit {
  userData: User[] = [];
  userError!: string;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userError = '';
    this.userData = [];
    this.dataService
      .getUser()
      .pipe(
        tap((response) => (this.userData = response)),
        catchError(({ message }) => (this.userError = message))
      )
      .subscribe();
  }
}
