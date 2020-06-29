import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.authService.logout();
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}
