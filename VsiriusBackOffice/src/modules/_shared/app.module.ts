import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxBreadcrumbModule } from 'ngx-dynamic-breadcrumb';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './containers';
import { NavComponent } from './containers/default-layout/nav/nav.component';
import { HeaderComponent } from './containers/default-layout/header/header.component';
import { LoginComponent } from '../login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_guards/auth.guard';
import { environment } from 'src/environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthService } from './_services/users/auth.service';
export function tokenGetter()
{
  return localStorage.getItem('TOKEN');
}
@NgModule({
  declarations: [	
    AppComponent,
    DefaultLayoutComponent,
    NavComponent,
    HeaderComponent,
    LoginComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxBreadcrumbModule.forRoot(),
    HttpClientModule,
    ModalModule.forChild(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),
  ],
  providers: [
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (authService:AuthService)=>()=>authService.startCheckExpirationTime(),
      multi: true,
      deps: [AuthService]
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
