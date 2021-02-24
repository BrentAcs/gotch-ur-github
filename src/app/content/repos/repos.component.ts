import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent extends BaseContentComponent implements OnInit {

  constructor(appUserService: AppUserService) {
    super(appUserService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
