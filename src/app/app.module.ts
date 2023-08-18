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
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from "@angular/material/core";
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
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { LoginRecuperarComponent } from './components/login/login-recuperar/login-recuperar.component';
import { LoginAlterarComponent } from './components/login/login-alterar/login-alterar.component';
import { CabecalhoComponent } from './components/cabecalho/cabecalho/cabecalho.component';
import { RelatorioUsuarioComponent } from './components/relatorio/relatorio-autitoria/relatorio-autitoria.component';
import { TelefonePipe } from './telefone.pipe';
import { CepPipe } from './cep.pipe';
import { DatePipe } from '@angular/common';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteListComponent } from './components/paciente/paciente-list/paciente-list.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
import { MedicoCreateComponent } from './components/medico/medico-create/medico-create.component';
import { MedicoListComponent } from './components/medico/medico-list/medico-list.component';
import { MedicoUpdateComponent } from './components/medico/medico-update/medico-update.component';
import { AgendaCreateComponent } from './components/agenda/agenda-create/agenda-create.component';
import { AgendaListComponent } from './components/agenda/agenda-list/agenda-list.component';
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
    TelefonePipe,
    CepPipe,
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    LoginRecuperarComponent,
    LoginAlterarComponent,
    CabecalhoComponent,
    RelatorioUsuarioComponent,
    PacienteCreateComponent,
    PacienteListComponent,
    PacienteUpdateComponent,
    PacienteDeleteComponent,
    MedicoCreateComponent,
    MedicoListComponent,
    MedicoUpdateComponent,
    AgendaCreateComponent,
    AgendaListComponent
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
    MatBadgeModule,
    MatDialogModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    DatePipe,
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
