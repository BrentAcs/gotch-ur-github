import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('f') homeForm: NgForm;

  //appUser: AppUser = { name: 'Brent', accessToken: '' };
  appUser: AppUser = { name: '', accessToken: '' };
  appUsername = '';

  constructor() {}

  ngOnInit(): void {}

  // onAppUsernameChange(){
  //   const value = this.homeForm.value.
  // }

  onSubmit() {
    console.log('home.component#onSubmit()');
  }
}



// TODO: Determine best practice was of handling this.
class AppUser {
  name: string;
  accessToken: string;
}
