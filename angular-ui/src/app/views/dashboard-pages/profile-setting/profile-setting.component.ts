import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GlobalService, JwtService, UsersService } from 'src/app/shared-ui';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss'],
})
export class ProfileSettingComponent implements OnInit {
  title = 'Profile Setting | Angular Node Training';
  userStaticDetail: any = {};
  requiredValidation: any = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };
  inValidateCheck: any = {
    phoneNumber: false,
    strongPasswordCheck: false,
  };

  //image upload Variable
  imageSrc: string = 'assets/img/brand/avatar.png';
  selectedFiles?: any = {
    imageInfo: [],
    imageUrl: '',
  };
  imageError: string = '';
  isImage: boolean = false;

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
  }

  onFileChange(event: any) {
    const fileData = event.target.files[0];
    if (!fileData.name.match(/\.(jpg|jpeg|png)$/)) {
      this.toastr.warning(
        'You can upload only jpg, jpeg, png, gif image.',
        'Warning'
      );
      return false;
    } else if (event.target.files && event.target.files.length) {
      this.selectedFiles.imageInfo = event.target.files[0];
      const reader = new FileReader(); // File Preview
      const [file] = event.target.files;

      reader.onload = (e: any) => {
        this.selectedFiles.imageUrl = e.target.result;
        // this.imageSrc = reader.result as string;
        this.isImage = true;
      };
      reader.readAsDataURL(file);
    }
    return;
  }



  saveUserInfo(postData: any) {
    let savePassword = postData.password;
    delete postData.confirm_password;
    this.usersService.saveUserInfo(postData).subscribe(
      (data: any) => {
        this.globalService.sendActionChildToParent('stop');
        if (data.status === 200) {
          let userDetails = data.data;
          delete userDetails.profileOldImage;
          if (savePassword) {
            this.jwtService.destroyToken();
            this.globalService.logOut();
            this.router.navigate(['/login']);
            this.toastr.success(data.message, 'Success');
          } else {
            this.toastr.success(data.message, 'Success');
            this.jwtService.saveCurrentUser(JSON.stringify(userDetails));
            this.globalService.sendActionChildToParent('updatedUserInfo');
          }
        } else {
          this.toastr.error(data.message, 'Error');
          this.globalService.sendActionChildToParent('stop');
        }
      },
      (error: any) => {
        this.globalService.sendActionChildToParent('stop');
        this.toastr.error(error, 'Error!');
      }
    );
    return;
  }
}
