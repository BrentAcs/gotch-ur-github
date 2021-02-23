import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  private baseUrl = 'https://gotchurgithub-default-rtdb.firebaseio.com/';

  constructor() {}
}
