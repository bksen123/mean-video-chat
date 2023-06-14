import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { currentUser, GlobalService, JwtService, UsersService } from '../../../shared-ui';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';

class loginUser {
  email: string = '';
  userPhoto?: string = '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: currentUser = new currentUser();
  loadingLoader: boolean = false;
  amwZoomId: string = '';
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.amwZoomId = res.amwZoomId;
      if (!this.amwZoomId && this.jwtService.getCurrentUser()) {
        this.router.navigate(['/dashboard']);
      }
      // console.log("this.amwZoomId", this.amwZoomId);
    });
  }

  // HERE WE are doing login with api
  doLogin() {
    let loginPostData = { ...this.login };
    this.usersService.doSignIn(loginPostData).subscribe(
      {
        next: (dataResp: any) => {
          this.loadingLoader = true;
          // this.spinner.hide();
          if (dataResp.status === 200) {
            let userDetails = dataResp.data;
            let configDetails = dataResp.config;
            userDetails.profileImage = loginPostData.profileImage;
            this.toastr.success(dataResp.message, 'Success');
            this.jwtService.saveToken(userDetails.authorization);
            this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
            this.jwtService.getCurrentUser();
            // this.jwtService.saveConfig(JSON.stringify(configDetails));
            // this.jwtService.getConfig();
            // this.globalService.sendActionChildToParent('Loggin');
            if (this.amwZoomId) {
              setTimeout(() => {
                window.location.replace(environment.baseUrl + this.amwZoomId);
              }, 3000);
            } else {
              // if (userDetails.role === environment.role.userRole) {
              //   this.router.navigate(['/you-are-unauthorized']);
              // } else {
              //   setTimeout(() => {
              //     this.router.navigate(['/dashboard']);
              //   }, 3000);
              // }
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 3000);
            }
          } else {
            this.toastr.error(dataResp.message, 'Error');
            this.loadingLoader = false;
          }
        },
        error: (error: any) => {
          this.loadingLoader = false;
          this.spinner.hide();
          this.toastr.error(error.message, 'Error');
        }
      }
    );
  }

  loginWithGoogle(): void {
    // console.log('ernter in function');
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp: any) => {
        // console.log('resp in function', resp);
        this.spinner.show();
        // console.log(resp.email, 'response === ', resp);
        if (resp.authToken) {
          this.login.email = resp.email;
          this.login.userName = resp.firstName + ' ' + resp.lastName;
          this.login.profileImage = resp.photoUrl;
          this.spinner.hide();
          this.doLogin();
        }
      })
      .catch((err) => {
        console.log('err', JSON.stringify(err));
      });
  }
}
