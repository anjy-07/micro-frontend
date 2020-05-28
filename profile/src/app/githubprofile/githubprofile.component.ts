import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile } from './profile';

@Component({
  selector: 'app-githubprofile',
  templateUrl: './githubprofile.component.html',
  styleUrls: ['./githubprofile.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class GithubprofileComponent implements OnInit {

  profile: Profile = {} as any;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.renderProfileData('wesbos');
  }

  renderProfileData(userName) {
    this.profileService.userData(userName).subscribe(data => {
      this.profile.name = data['name'];
      this.profile.imageUrl = data['avatar_url'];
      this.profile.bio = data['bio'];
      this.profile.followers = data['followers'];
      this.profile.following = data['following'];
      this.profile.repositories = data['public_repos'];
      this.profile.joined = '10';
      this.profile.starred = '118';
      this.profile.pinned = '6';
    });
  }

}
