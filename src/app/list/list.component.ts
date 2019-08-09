import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IUser } from '../user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public users = [];
  selectedUser: IUser;
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getListUsers();
  }

  onSelect(user: IUser) {
    this.selectedUser = user;
  }

  updateModel($event) {
    this.getListUsers();
  }

  getListUsers() {
    this.dataService.getUsers().subscribe (data => {
      this.isLoading = false;
      this.users = data;
    });
  }
}
