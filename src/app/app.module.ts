import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './component/product/product.component';
import {RouterModule, Routes} from '@angular/router';
import { V1Component } from './component/v1/v1.component';
import { BaseformComponent } from './component/baseform/baseform.component';
import {ProductService} from './shared/product.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ListComponent } from './component/list/list.component';
import { LoginComponent } from './component/login/login.component';
import {MaxModule} from './max/max.module';
import {AuthInterceptor} from './shared/AuthInterceptor.service';
import {BaseHttpInterceptorService} from './shared/BaseHttpInterceptorService.service';
import {httpInterceptorProviders} from './index';
import { NotelistComponent } from './component/notelist/notelist.component';
import { TechdeptComponent } from './component/techdept/techdept.component';
import { AoComponent } from './ao/ao.component';

const routeConfig: Routes = [

  {path: '',
  component: V1Component,
  children: [
    { path: '', redirectTo: 'techdept', pathMatch: 'full'},
    {path: 'product', component: ProductComponent},
    {path: 'list', component: ListComponent},
    {path: 'notelist', component: NotelistComponent},
    {path: 'techdept', component: TechdeptComponent},
  ]},
  {path: 'login/oa', component: AoComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: BaseformComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    ProductComponent,
    V1Component,
    BaseformComponent,
    ListComponent,
    LoginComponent,
    NotelistComponent,
    TechdeptComponent,
    AoComponent
  ],
  providers: [ ProductService, {provide: LocationStrategy, useClass: HashLocationStrategy},
    //{ provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routeConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
