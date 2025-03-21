import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AlertService, JwtService, UsersService } from 'src/app/shared-ui';
import { MeetingsService } from 'src/app/shared-ui/services/meetings.service';
import { environment } from 'src/environments/environment';
import { meeting } from '../models/meeting.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  deleteCrtUser: any;

  meetingTab: string = 'all'
  meetingInfo: meeting = new meeting();
  userRoles: any = environment.role;
  usersList: any[] = [];
  meetingsList: any[] = [];
  meetingUsersList: any[] = [];
  currentUser: any;
  disabled = false;
  usersDropdownSettings: any = {};
  @ViewChild('showAddEditMeetingModal', { static: false, })
  public showAddEditMeetingModal: any = ModalDirective;
  @ViewChild('deleteMeetingModal', { static: false })
  public deleteMeetingModal: any = ModalDirective;

  constructor(
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private _meetingsService: MeetingsService,
    private jwtService: JwtService,
  ) {
    this.getUsersList();
  }

  ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
    this.getMeetings();
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

  getUsersList() {
    this.usersService.getUsersList().subscribe({
      next: (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status == 200) {
          this.spinner.hide();
          dataRes.data = dataRes.data.filter((e: any) => e._id !== this.currentUser._id);
          this.usersList = dataRes.data;
        }
      },
      error: (error: any) => {
        this.spinner.hide()
        this.toastr.error(error.message, 'Error!');
      }
    });
  }

  checkvalidation(key: any) {
    let Validate: any = { ...this.meetingInfo };
    if (Validate[key]) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  showAddEditModal(meetingInfoValue?: any) {
    this.alertService.clear();
    if (meetingInfoValue && meetingInfoValue._id) {
      this.meetingInfo = Object.assign({}, meetingInfoValue);
    } else {
      this.meetingInfo = new meeting();
    }
    this.showAddEditMeetingModal.show();
  }

  closeModel() {
    this.showAddEditMeetingModal.hide();
    this.deleteMeetingModal.hide();
  }

  addMeeting() {
    const self = this;
    if (!this.meetingInfo.title ||
      !this.meetingInfo.userIds.length
    ) {
      this.alertService.clear();
      this.alertService.error("*Please Fill All Fields are mandatory.");
      this.spinner.hide();
      return false
    }
    this.spinner.show();
    let userPostData = JSON.parse(JSON.stringify(this.meetingInfo)); //IT BROKES TWO WAY DATABINDING
    // HERE WE CAN CALL API FOR SAVING DATA
    this._meetingsService.saveMeetings(userPostData).subscribe(
      {
        next: (dataRes: any) => {
          this.spinner.hide();
          if (dataRes.status === 200) {
            this.toastr.success(dataRes.message, 'Success!');
            dataRes = dataRes.data;
            this.closeModel();
            this.getMeetings();
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

  showMeetingDeleteModal(meeting: any) {
    this.meetingInfo = meeting;
    this.deleteMeetingModal.show();
  }

  getMeetings(tab?: string) {
    if (tab) {
      this.meetingTab = tab
    }
    this.spinner.show();
    this._meetingsService.getMeetingsList({ tab: this.meetingTab }).subscribe(
      {
        next: (dataRes: any) => {
          this.spinner.hide();
          if (dataRes.status === 200) {
            this.meetingsList = dataRes.data;
          }
        },
        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error(error.message, 'Error!');
        }
      }
    )
  }

  getMeetingUsers(meeting: any) {
    this._meetingsService.getMeetingsUser({ meetingId: meeting._id }).subscribe(
      {
        next: (dataRes: any) => {
          if (dataRes.status === 200) {
            this.spinner.hide();
            this.meetingUsersList = dataRes.data;
          }
        },
        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error(error.message, 'Error!');
        }
      }
    )
  }

  deleteMeeting() {
    this.spinner.show();
    this._meetingsService.deleteMeeting(this.meetingInfo).subscribe(
      (dataRes) => {
        // console.log("error", dataRes)
        this.spinner.hide();
        if (dataRes.status === 200) {
          this.closeModel();
          this.getMeetings();
          this.toastr.success('Meeting deleted successfully.', 'Success');
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

}

