import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  BASE_URL = 'http://127.0.0.1:8080/'
  errorMessage?: string;

  constructor(private titleService: Title, private fb: FormBuilder, private http: HttpClient) {}
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    this.titleService.setTitle('Signup');
  }
  Signup(){
    const data = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.http.post(this.BASE_URL + 'users/', data).subscribe(
      (response) => {
        console.log('API Response:', response);
        // Handle the response here
      },
      (error) => {
      this.errorMessage = error.error['detail']; // Assuming the error object contains a 'message' property
      console.error('Error:', this.errorMessage);
      }
    );
  }
}
