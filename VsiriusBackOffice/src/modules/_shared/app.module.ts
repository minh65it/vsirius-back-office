import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    NgxBreadcrumbModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
