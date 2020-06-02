import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  userData(userName) {
    return this.httpClient.get('https://api.github.com/users/' + userName);
  }

  starredData(userName) {
    return this.httpClient.get('https://api.github.com/users/' + userName + '/starred');
  }

}
