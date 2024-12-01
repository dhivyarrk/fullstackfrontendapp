import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../env';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Call function to handle the callback and extract data from URL
    this.handleCallback();
  }

  handleCallback(): void {
    // Extract the user info from the query parameters
    //const urlParams = new URLSearchParams(window.location.search);
    //const userInfo = JSON.parse(urlParams.get('user_info') || '{}');

    console.log("what is here");
    this.http.get(`${API_URL}/user_info`, { withCredentials: true }).subscribe(
      (response: any) => {
        console.log("response in callback");
        console.log(response);
        //localStorage.setItem('user', JSON.stringify(response.user_info));
        localStorage.setItem('token', response.user.token); // Save JWT token
        localStorage.setItem('user_type', response.user.user_type); // Save JWT token
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
    
  }
}
