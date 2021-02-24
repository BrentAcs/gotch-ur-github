import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  encryptSecretKey = 'boobs';

  constructor() {}

  ngOnInit() {
    // try {
    //   const en = CryptoService.encryptAES('brent', this.encryptSecretKey);
    //   console.log(en);
    //   const de = CryptoService.decryptAES(en, this.encryptSecretKey);
    //   console.log(de);
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }
  }
}
