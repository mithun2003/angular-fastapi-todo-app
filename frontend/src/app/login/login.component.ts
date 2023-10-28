import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

interface APIResponse {
token: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
BASE_URL = 'http://127.0.0.1:8080/'
errorMessage ?: string;

constructor(private titleService: Title, private fb: FormBuilder, private http: HttpClient, private router: Router) { }
Loginform: FormGroup = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required]
})

ngOnInit(): void {
  this.titleService.setTitle('Login');
}
login() {
  const formData = new HttpParams()
    .set('grant_type', '')
    .set('username', this.Loginform.value.email)
    .set('password', this.Loginform.value.password)


  this.http.post<APIResponse>(this.BASE_URL + 'users/login/', formData).subscribe(
    (response) => {
      console.log('API Response:', response);
      sessionStorage.setItem('token', response.token);
      // Handle the response here
      this.router.navigateByUrl('')
    },
    (error) => {
      this.errorMessage = error.error['detail']; // Assuming the error object contains a 'message' property
      console.error('Error:', this.errorMessage);
    }
  );
}

}
