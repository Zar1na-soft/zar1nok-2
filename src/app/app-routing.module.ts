import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {MainpageComponent} from "./components/pages/mainpage/mainpage.component";
import {OpenrequestComponent} from "./components/pages/openrequest/openrequest.component";
import {CreaterequestComponent} from "./components/pages/createrequest/createrequest.component";
import {ReadyRequestComponent} from "./components/pages/ready-request/ready-request.component";
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { Authguard } from './shared/authguard.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"main_page",
    component: MainpageComponent
  },

  {
    path:"create_request",
    component: CreaterequestComponent
  },

  {
    path:"ready_request",
    component: ReadyRequestComponent
  },

  {
    path:"sign_in",
    component: SignInComponent
  },

  {
    path:"sign_up",
    component: SignUpComponent
  },

  { 
    path: 'open_request/:id',
    component: OpenrequestComponent

  },
  { path: 'protected', component: CreaterequestComponent, canActivate: [Authguard] },

  {path: 'user_account',component: UserProfileComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
