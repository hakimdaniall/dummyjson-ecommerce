import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = { username: 'kminchelle', password: '0lelplR' };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }


  onSubmit() {
    this.http.post('https://dummyjson.com/auth/login', this.loginData).subscribe(
      (response) => {
        this.router.navigate(['products'])
        this.authService.setLoggedIn(true);

      },
      (error) => {
        alert(error.error.message)
      }
    );
  }

}
