import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  ngOnInit() {
    /*  if (environment.production) {
       if (location.protocol === 'http:') {
         window.location.href = location.href.replace('http', 'https');
       }
 
       // if (location.protocol === 'http:') {
       //   window.location.href = location.href.replace('http', 'https');
       // } else if (location.host === 'eqnaa3.com') {
       //   window.location.href = location.href.replace('eqnaa3.com', 'www.eqnaa3.com');
       // }
     } */
  }
}
