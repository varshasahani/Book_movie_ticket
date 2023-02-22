import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../user.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  opened = true;
  isDarktheme = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOninit() {
    this.isDarktheme = localStorage.getItem('theme') === "Dark" ? true : false;
  }

  onselectionTheme() {
    localStorage.setItem('theme', this.isDarktheme ? "Dark" : "Light");

  }

  openLogin() {
    this.dialog.open(LoginComponent)
  }

  openLogout(): void {
    this.dialog.open(LogoutPopup, {
      width: '250px'
    })
  }
}







@Component({
  templateUrl: 'logout-popup.html',
})
export class LogoutPopup {
  constructor(public dialogRef: MatDialogRef<LogoutPopup>,
    public userService: UserService,
    private _snackBar: MatSnackBar) { }

  logout() {
    this.userService.setUser(null)
    this._snackBar.open("Logout Successfully!", 'Close', {
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}