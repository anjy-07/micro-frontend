import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'parent';
  user: string;
  inputValue = '';
  breakpoint: number;
  angularSpan: number;
  reactSpan: number;

  constructor() {
  }

  ngOnInit(): void {
    console.log(window.innerWidth);
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 9;
    this.angularSpan = (window.innerWidth <= 800) ? 1 : 2;
    this.reactSpan = (window.innerWidth <= 800) ? 1 : 7;
  }

  onResize(event) {
    console.log(event.target.innerWidth);
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 9;
    this.angularSpan = (window.innerWidth <= 800) ? 1 : 2;
    this.reactSpan = (window.innerWidth <= 800) ? 1 : 7;
  }

  renderBoard() {

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

