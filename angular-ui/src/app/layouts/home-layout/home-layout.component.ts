import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }


}
