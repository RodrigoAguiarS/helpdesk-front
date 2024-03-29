import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';


import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login/login.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { CPFPipe } from './cpf.pipe';
import { CnpjFormatPipe } from './cnpjFormatPipe';
import { InscricaoEstadualFormatPipe } from './inscricaoEstadualFormatPipe';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { AdminComponent } from './components/admin/admin/admin.component';


import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { ClinicaCreateComponent } from './components/clinica/clinica-create/clinica-create.component';
import { ClinicaListComponent } from './components/clinica/clinica-list/clinica-list.component';
import { ClinicaUpdateComponent } from './components/clinica/clinica-update/clinica-update.component';
import { LoginAlterarComponent } from './components/login/login-alterar/login-alterar.component';
import { LoginRecuperarComponent } from './components/login/login-recuperar/login-recuperar.component';
import { ConvenioCreateComponent } from './components/convenio/convenio-create/convenio-create.component';
import { ConvenioListComponent } from './components/convenio/convenio-list/convenio-list.component';
import { ConvenioUpdateComponent } from './components/convenio/convenio-update/convenio-update.component';
import { ConvenioDeleteComponent } from './components/convenio/convenio-delete/convenio-delete.component';
import { EspecialidadeCreateComponent } from './components/especialidade/especialidade-create/especialidade-create.component';
import { EspecialidadeListComponent } from './components/especialidade/especialidade-list/especialidade-list.component';
import { EspecialidadeUpdateComponent } from './components/especialidade/especialidade-update/especialidade-update.component';
import { EspecialidadeDeleteComponent } from './components/especialidade/especialidade-delete/especialidade-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    LoginComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteListComponent,
    ClienteUpdateComponent,
    ChamadoListComponent,
    ChamadoCreateComponent,
    CPFPipe,
    InscricaoEstadualFormatPipe,
    CnpjFormatPipe,
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    UsuarioListComponent,


    AdminComponent,
    UsuarioDeleteComponent,
    ClinicaCreateComponent,
    ClinicaListComponent,
    ClinicaUpdateComponent,
    LoginAlterarComponent,
    LoginRecuperarComponent,
    ConvenioCreateComponent,
    ConvenioListComponent,
    ConvenioUpdateComponent,
    ConvenioDeleteComponent,
    EspecialidadeCreateComponent,
    EspecialidadeListComponent,
    EspecialidadeUpdateComponent,
    EspecialidadeDeleteComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
