import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxBreadcrumbModule } from 'ngx-dynamic-breadcrumb';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ContactSignalRService } from './_services/contact-signalR.service';
import { GlobalErrorHandler } from './_helpers/log-interceptor ';
import { SystemLoggingService } from './_services/system/system-logging.service';
import { AuthInterceptor } from './_helpers/auth-interceptor ';
export function tokenGetter() {
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
      useFactory: (authService: AuthService) => () => authService.startCheckExpirationTime(),
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ////  Khởi động SignalR
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (contactSignalrService: ContactSignalRService) => () => contactSignalrService.startConnectionContact(),
    //   deps: [ContactSignalRService],
    //   multi: true,
    // },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //System logging 
    SystemLoggingService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
