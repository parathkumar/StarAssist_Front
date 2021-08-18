import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './shared/modules/layout/sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutContainerComponent } from './shared/modules/layout/layout-container/layout-container.component';
import { HeaderComponent } from './shared/modules/layout/header/header.component';
import { FooterComponent } from './shared/modules/layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedImportsModule } from 'src/app/shared/modules/shared-imports/shared-imports.module';
import { ConfirmationAlertComponent } from './shared/modules/alerts/confirmation-alert/confirmation-alert.component';
import { SuccessAlertComponent } from './shared/modules/alerts/success-alert/success-alert.component';
import { ErrorAlertComponent } from './shared/modules/alerts/error-alert/error-alert.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './core/auth/guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutContainerComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationAlertComponent,
    SuccessAlertComponent,
    ErrorAlertComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,    
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    SharedImportsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["starassistdev.azurewebsites.net"],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("jwt");
}