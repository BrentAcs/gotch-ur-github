import { Component, OnInit } from '@angular/core';

import { AppUserService } from './services/app-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  encryptSecretKey = 'boobs';

  constructor(private appUserService: AppUserService) {}

  ngOnInit() {}
}
