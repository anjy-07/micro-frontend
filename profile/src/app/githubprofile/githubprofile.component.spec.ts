import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubprofileComponent } from './githubprofile.component';

describe('GithubprofileComponent', () => {
  let component: GithubprofileComponent;
  let fixture: ComponentFixture<GithubprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
