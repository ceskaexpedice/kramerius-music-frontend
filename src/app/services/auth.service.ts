import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularTokenService } from 'angular-token';
import { PlaylistService } from './playlist-service';
import { LibraryService } from './library-service';
import { SimpleDialogData } from '../dialogs/simple-dialog/simple-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SimpleDialogComponent } from '../dialogs/simple-dialog/simple-dialog.component';

@Injectable()
export class AuthService {

  user: User;

  constructor(
    private tokenService: AngularTokenService, 
    private dialog: MatDialog,
    private router: Router,
    private library: LibraryService,
    private playlists: PlaylistService) {
  }

  processOAuthCallback(callback: (success: boolean) => void) {
      this.tokenService.processOAuthCallback();
      this.tokenService.validateToken().subscribe(
        response => {
          this.afterLogin();
          if (callback) {
              callback(true);
          }
        },
        error => {
          if (callback) {
              callback(false);
          }
      }
    );
  }

  signInOAuth(provider: string, callback: (success: boolean) => void) {
      this.tokenService.tokenOptions.oAuthWindowType = 'sameWindow'; 
      this.tokenService.signInOAuth(provider).subscribe(
          (response) => {
              console.log('signInOAuth success', response);
              if (callback) {
                  callback(true);
              }
          },
          (error) => {
              console.log('signInOAuth failure', error);
              if (callback) {
                  callback(false);
              }
          });
  }

  logout(callback: () => any) {
      return this.tokenService.signOut().subscribe(() => {
          this.user = null;
          if (callback) {
              callback();
          }
      });
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  afterLogin() {
    const userData = this.tokenService.currentUserData;
    if (!userData) {
      // TODO: no user data
      return;
    }
    this.user = User.fromJson(userData);
    this.playlists.reload();
    this.library.load();
  }


  showSigninRequiredDialog(message: string = "") {
    const data: SimpleDialogData = {
      title: "Je vyžadováno přihlášení",
      message: message,
      btn1: {
        label: 'Přihlásit',
        value: 'login',
        color: 'primary'
      },
      btn2: {
        label: 'Zrušit',
        value: 'cancel',
        color: 'light'
      }
    };
    const dialogRef = this.dialog.open(SimpleDialogComponent, { data: data });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.router.navigate(['/', 'login']);
      }
    });
  }



}
