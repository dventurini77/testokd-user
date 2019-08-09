import { Component, Input, Output } from '@angular/core';
import { DataService } from '../data.service';
import { IUser } from '../user.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: IUser;
  @Output() modelChange = new EventEmitter();

  constructor(private dataService: DataService) { }

  onAdd() {
    this.dataService.addUser(this.user).subscribe(data => {
      this.user = data;
      this.modelChange.emit(this.user.Name);
    });
  }

  onUpdate() {
    this.dataService.updateUser(this.user).subscribe(data => {
      this.modelChange.emit(this.user.Name);
    });
  }

  onRemove() {
    this.dataService.deleteUser(this.user).subscribe(data => {
      this.modelChange.emit(this.user.Name);
   });
  }
}
