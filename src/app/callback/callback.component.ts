import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../env';
import { firstValueFrom } from 'rxjs';
import { constants } from 'node:zlib';
import { Observable } from 'rxjs';


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
    this.handleCallback(); //.catch(err => console.error('handleCallback error:', err));

  }



  handleCallback(): any {
    //const token = localStorage.getItem('token');
    const response = this.http.get(`${API_URL}/user_info`
      //, {
      // headers: { Authorization: `Bearer ${token}` },
  //  }
  );
  console.log("inhandlecallback");
  console.log(response);

  }




}
