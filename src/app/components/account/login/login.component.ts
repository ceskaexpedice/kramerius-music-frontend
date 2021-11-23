import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: string;
  message: string;

  constructor(private auth: AuthService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.state = 'none';
    this.route.queryParams.subscribe(params => {
      const googleSuccess = params['google-success'];
      if (googleSuccess && googleSuccess == "false") {
        this.state = 'failure';
        this.message = 'google_login';
      }
    });
  }


  loginWithGoogle() {
    this.auth.signInOAuth('google', () => {
    });
  }

}
