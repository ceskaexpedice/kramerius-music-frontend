import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  templateUrl: './omniauth.component.html'
})
export class OmniauthComponent implements OnInit {

  constructor(private router: Router,
              private local: LocalStorageService,
              private account: AuthService) {}

  ngOnInit() {
    this.account.processOAuthCallback((success) => {
      if (success) {
        const url = this.local.getStringProperty('login.url', '/');
        this.local.setStringProperty('login.url', '/');
        this.router.navigateByUrl(url);
      }
    });
  }

}
