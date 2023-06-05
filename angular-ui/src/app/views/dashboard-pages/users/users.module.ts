import { NgModule } from '@angular/core';
import { SharedUiModule } from 'src/app/shared-ui';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedUiModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
