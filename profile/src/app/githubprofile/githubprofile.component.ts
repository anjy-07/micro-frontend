import { Component, OnInit, ViewEncapsulation, ElementRef, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile } from './profile';

@Component({
  selector: 'app-githubprofile',
  templateUrl: './githubprofile.component.html',
  styleUrls: ['./githubprofile.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class GithubprofileComponent implements OnInit, AfterContentChecked {

  @Input() username: string;
  @Output() userEvent: EventEmitter<string> = new EventEmitter();
  once = false;
  profile: Profile = {} as any;

  constructor(private profileService: ProfileService) {

  }
  ngAfterContentChecked() {
    if (!this.once) {
      this.renderProfileData(this.username);
      this.once = true;
    }
  }

  ngOnInit(): void {
  }

  renderProfileData(userName) {
    this.profileService.userData(userName).subscribe(data => {
      this.profile.name = data['name'];
      this.profile.imageUrl = data['avatar_url'];
      this.profile.bio = data['bio'];
      this.profile.followers = data['followers'];
      this.profile.following = data['following'];
      this.profile.repositories = data['public_repos'];
      this.profile.joined = this.dateDiff(new Date(data['created_at']));
      this.profile.pinned = '6';
    });

    this.profileService.starredData(userName).subscribe((data: any[]) => this.profile.starred = data.length.toString());
  }

  dateDiff(dateOld) {
    const dateNew = new Date();
    const ynew = dateNew.getFullYear();
    const mnew = dateNew.getMonth();
    const dnew = dateNew.getDate();
    const yold = dateOld.getFullYear();
    const mold = dateOld.getMonth();
    const dold = dateOld.getDate();
    let diff = ynew - yold;
    if (mold > mnew) {
      diff--;
    }
    else {
      if (mold === mnew) {
        if (dold > dnew) {
          diff--;
        }
      }
    }
    return diff;
  }

}
