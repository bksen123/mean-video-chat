import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AlertService, GlobalService, UsersService } from 'src/app/shared-ui';
import { MeetingsService } from 'src/app/shared-ui/services/meetings.service';
import { environment } from 'src/environments/environment';
import { meeting, validationFields } from '../models/meeting.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  meetingTab: string = 'all'
  userInfo: meeting = new meeting();
  userRoles: any = environment.role;
  usersList: any[] = [];
  meetingsList: any[] = [];
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

  disabled = false;
  usersDropdownSettings: any = {};

  constructor(
    private globalService: GlobalService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private _meetingsService: MeetingsService,
  ) {
    this.getUsersList();
  }

  ngOnInit(): void {
    this.getMeetings();
    this.getMeetingEmp();
    this.usersDropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'userName',
      selectAllText: 'Select All AMW Users',
      unSelectAllText: 'UnSelect All AMW Users',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next("");
  }

  getUsersList() {
    this.usersService.getUsersList().subscribe({
      next: (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status == 200) {
          this.spinner.hide();
          this.usersList = dataRes.data;
          // console.log("userList",this.usersList);
        }
      },

      error: (error: any) => {
        this.spinner.hide()
        this.toastr.error(error.message, 'Error!');
      }
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

  showAddEditModal(userInfoValue?: any) {
    this.alertService.clear();
    this.inValidateCheck.emailExits = true;
    if (userInfoValue && userInfoValue._id) {
      this.inValidateCheck.email = true;
      this.userInfo = Object.assign({}, userInfoValue);
    } else {
      this.userInfo = new meeting();
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

  addMeeting() {
    const self = this;
    this.spinner.show();
    if (!this.userInfo.title ||
      !this.userInfo.userIds.length
    ) {
      this.alertService.clear();
      this.alertService.error("*Please Fill All Fields are mandatory.");
      this.spinner.hide();
      return false
    }
    let userPostData = JSON.parse(JSON.stringify(this.userInfo)); //IT BROKES TWO WAY DATABINDING
    // HERE WE CAN CALL API FOR SAVING DATA
    this._meetingsService.saveMeetings(userPostData).subscribe(
      {
        next: (dataRes: any) => {
          if (dataRes.status === 200) {
            this.spinner.hide();
            this.toastr.success(dataRes.message, 'Success!');
            dataRes = dataRes.data;
            this.closeModel();
          }
        },
        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error(error.message, 'Error!');
        }
      }
    );
    return
  }

  deleteUser() {
    this.spinner.show();
    this.usersService.deleteUser(this.userInfo).subscribe(
      (dataRes) => {
        console.log("error", dataRes)
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getUsersList();
          this.toastr.success('User deleted successfully.', 'Success');
        }
      },
      (error) => {
        console.log("error", error)
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

  getMeetings() {
    this._meetingsService.getMeetingsList().subscribe(
      {
        next: (dataRes: any) => {
          if (dataRes.status === 200) {
            this.spinner.hide();
            this.meetingsList = dataRes.data;
            console.log('Get All meeting data into component---', this.meetingsList);
          }
        },
        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error(error.message, 'Error!');
        }
      }
    )
  }

  getMeetingEmp() {
    this._meetingsService.getMeetingsList().subscribe(
      {
        next: (dataRes: any) => {
          if (dataRes.status === 200) {
            this.spinner.hide();
            console.log('Get All meeting data into component', dataRes.data[0]._id);
          }
        },
        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error(error.message, 'Error!');
        }
      }
    )
  }

}

