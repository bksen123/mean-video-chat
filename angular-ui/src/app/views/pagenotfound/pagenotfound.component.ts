import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared-ui';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss'],
})
export class PagenotfoundComponent implements OnInit {
  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {}
}
