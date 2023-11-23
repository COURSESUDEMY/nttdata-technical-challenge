import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [ListUserComponent, UpdateUserComponent],
  imports: [CommonModule, NavigationRoutingModule],
})
export class NavigationModule {}
