import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../../components/driver-builder/utils/constants';
import { UserService, User } from '../../shared-services/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public applicationName: string = Constants.applicationName;
  @Output() public sidenavToggle = new EventEmitter();
  currentUser: User;

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
