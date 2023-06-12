import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AlertService, GlobalService, UsersService } from 'src/app/shared-ui';
import { environment } from 'src/environments/environment';
import { user, validationFields } from './models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userInfo: user = new user();
  userRoles: any = environment.role;
  usersList: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  newUserAlready = false;
  @ViewChild('showAddEditUserModal', { static: false, })
  public showAddEditUserModal: any = ModalDirective;
  @ViewChild('deleteUserModal', { static: false })
  public deleteUserModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  inValidateCheck: any = {
    email: false,
    emailExits: true,
  };

  constructor(
    private globalService: GlobalService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private alertService: AlertService,
  ) {
    this.getUsersList();
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [{
        targets: 5,
        orderable: false,
        searchable: false,
      }, {
        targets: 6,
        orderable: false,
        searchable: false,
      },],
    };
    this.userRoles = Object.values(this.userRoles) //convert object to array
    // console.log("this.userRoles======", this.userRoles);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next("");
  }

  getUsersList() {
    this.usersService.getUsersList().subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status == 200) {
        this.spinner.hide();
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next("");
          this.usersList = dataRes.data;
          this.spinner.hide();
        });
        // console.log("userList",this.usersList);
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  checkvalidation(key: any) {
    let Validate: any = { ...this.userInfo };
    if (Validate[key]) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  patternMatchCheck(userInfoValue: any, validateType: string) {
    if (userInfoValue) {
      const validate = this.globalService.patternMatchRegex(userInfoValue, validateType)
      this.inValidateCheck[validateType] = validate;
      if (this.inValidateCheck[validateType] && validateType === 'email') {
        validateType = 'emailExits'
        userInfoValue = userInfoValue + environment.emaildomain;
        this.usersService.emailAlreadyExists({ email: userInfoValue }).subscribe((dataRes: any) => {
          if (dataRes.status === 200) {
            this.inValidateCheck[validateType] = false
          } else {
            this.inValidateCheck[validateType] = true
          }
        }, (error: any) => {
          this.inValidateCheck[validateType] = false
        });
      } else {
        this.inValidateCheck[validateType] = validate;
        this.inValidateCheck.emailExits = true;
      }
    } else {
      this.inValidateCheck[validateType] = true
    }
  }

  showAddEditModal(userInfoValue?: any) {
    this.alertService.clear();
    this.inValidateCheck.emailExits = true;
    if (userInfoValue && userInfoValue._id) {
      this.inValidateCheck.email = true;
      this.userInfo = Object.assign({}, userInfoValue);
    } else {
      this.userInfo = new user();
    }
    this.showAddEditUserModal.show();
  }

  closeModel() {
    this.showAddEditUserModal.hide();
    this.deleteUserModal.hide();
  }

  showUserDeleteModal(user: any) {
    this.userInfo = user;
    this.deleteUserModal.show();
  }

  addUser() {
    const self = this;
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData = JSON.parse(JSON.stringify(self.userInfo)); //IT BROKES TWO WAY DATABINDING
    const found = ObjectKeys.filter((obj: any) => {
      return !postData[obj];
    });
    const found2 = Object.keys(this.inValidateCheck).filter((obj2: any) => {
      return !self.inValidateCheck[obj2];
    });
    this.spinner.show();
    if (found.length ||
      found2.length
    ) {
      this.alertService.clear();
      this.alertService.error("*Please Fill All Fields are mandatory.");
      this.spinner.hide();
      return false
    }
    let userPostData = JSON.parse(JSON.stringify(this.userInfo)); //IT BROKES TWO WAY DATABINDING
    if (!userPostData._id) {
      userPostData.email = userPostData.email + environment.emaildomain;
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.usersService.saveUserInfo(userPostData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.toastr.success(dataRes.message, 'Success!');
        dataRes = dataRes.data;
        this.closeModel();
        // if (!userPostData._id) {
        //   this.usersList.unshift(dataRes);
        // } else {
        //   let index = this.usersList.findIndex(x => x._id === dataRes._id);
        //   if (index) {
        //     this.usersList[index] = dataRes;
        //   }
        // }
        this.getUsersList();
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
    return
  }

  deleteUser() {
    this.spinner.show();
    this.usersService.deleteUser(this.userInfo).subscribe(
      (dataRes) => {
        // console.log("error", dataRes)
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getUsersList();
          this.toastr.success('User deleted successfully.', 'Success');
        }
      },
      (error) => {
        // console.log("error", error)
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error. Please check connection.',
          'Error'
        );
      }
    );
  }

  changeUserStatus(user: any) {
    let postData = {
      _id: user._id,
      status: user.status ? 0 : 1
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.usersService.saveUserInfo(postData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        dataRes = dataRes.data;
        this.spinner.hide();
        this.toastr.success('User status has been changed successfully.', 'Success!');
        let index = this.usersList.findIndex(x => x._id === dataRes._id);
        if (index) {
          this.usersList[index].status = dataRes.status;
        }
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

}
