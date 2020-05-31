import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parent';
  user: string;
  inputValue = '';

  constructor(@Inject(DOCUMENT) document) {
  }

  renderBoard() {
    console.log("USERNAME :: ", this.inputValue);
    const ngProfile = document.createElement('ng-profile');
    ngProfile.setAttribute('username', this.inputValue);
    ngProfile.setAttribute('class', 'angular');
    const angularContainer = document.getElementById('angular-element');
    if (angularContainer.children.length > 0) {
      angularContainer.removeChild(angularContainer.children[0]);
    }
    angularContainer.appendChild(ngProfile);

    const reactChart = document.createElement('react-el');
    reactChart.setAttribute('username', this.inputValue);
    reactChart.setAttribute('class', 'react');
    const reactContainer = document.getElementById('react-element');
    if (reactContainer.children.length > 0) {
      reactContainer.removeChild(reactContainer.children[0]);
    }
    reactContainer.appendChild(reactChart);
  }
}

