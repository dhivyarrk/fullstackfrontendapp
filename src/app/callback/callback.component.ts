import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../env';
import { firstValueFrom } from 'rxjs';

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
    console.log("in init");
    // Call function to handle the callback and extract data from URL
    //this.handleCallback();
    this.handleCallback().catch(err => console.error('handleCallback error:', err));

  }


async handleCallback(): Promise<void> {
  try {
    console.log('Initiating HTTP GET request');
    const response: any = await firstValueFrom(this.http.get(`${API_URL}/user_info`));
    console.log('API URL:', `${API_URL}/user_info`);
    console.log('Response received:', response);
    this.http.get(`${API_URL}/user_info`).subscribe({
      next: data => console.log('Data:', data),
      error: err => console.error('Error:', err),
      complete: () => console.log('Request completed')
    });
    
    if (response && response.user) {
      console.log('Saving user data to localStorage');
      console.log(response);
      localStorage.setItem('user', response.user.user_name); // Save user_name
      localStorage.setItem('token', response.user.token); // Save JWT token
      localStorage.setItem('user_type', response.user.user_type); // Save user_type
      await this.router.navigate(['/dashboard']); // Navigate after saving
    } else {
      console.log("in  else");
      console.warn('Response does not contain user data:', response);
    }
  } catch (error) {
    console.log("in error");
    console.error('Error fetching user info:', error);
  }
}


}
