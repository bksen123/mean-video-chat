import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { currentUser, GlobalService, JwtService, UsersService } from '../../../shared-ui';
import { environment } from 'src/environments/environment';
import { MeetingsService } from 'src/app/shared-ui/services/meetings.service';
class AcknowledClass {
  uuZoomId: string = '';
  userId: string = '';
  userAck: boolean = true;
}

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {
  acknowledConfi: AcknowledClass = new AcknowledClass();
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _MeetingsService: MeetingsService

  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.acknowledConfi.uuZoomId = res.uuZoomId;
      this.acknowledConfi.userId = res.userId;
      console.log("acknowledConfi=========", this.acknowledConfi);
      this.acknowledgement();
    });
  }

  // HERE WE are doing login with api
  acknowledgement() {
    this._MeetingsService.acknowledgement(this.acknowledConfi).subscribe(
      {
        next: (dataResp: any) => {
          // this.spinner.hide();
          if (dataResp.status === 200) {

          } else {
            this.toastr.error(dataResp.message, 'Error');
          }
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error');
        }
      }
    );
  }

}
