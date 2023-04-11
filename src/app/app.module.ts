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
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
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
import { LiderCreateComponent } from './components/lider/lider-create/lider-create.component';
import { LiderListComponent } from './components/lider/lider-list/lider-list.component';
import { TelefonePipe } from './telefone.pipe';
import { NumerosEumaLetraPipe } from './numero.pipe';
import { LiderUpdateComponent } from './components/lider/lider-update/lider-update.component';
import { GerarPdfComponent } from './components/gerar-pdf/gerar-pdf.component';
import { LiderDeleteComponent } from './components/lider/lider-delete/lider-delete.component';
import { RelogioPontoComponent } from './components/relogio/relogio-ponto/relogio-ponto.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmacaoModalComponent } from './components/modal/confirmacao-modal-component/confirmacao-modal-component.component';
import { RelogioPontoListComponent } from './components/relogio/relogio-ponto-list/relogio-ponto-list.component';
import { VendaCreateComponent } from './components/venda/venda-create/venda-create.component';
import { CommonModule } from '@angular/common';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyFormatDirective } from './currency-format.directive';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { VendaListComponent } from './components/venda/venda-list/venda-list.component';
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
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    LiderCreateComponent,
    LiderListComponent,
    NumerosEumaLetraPipe,
    LiderUpdateComponent,
    GerarPdfComponent,
    LiderDeleteComponent,
    RelogioPontoComponent,
    ConfirmacaoModalComponent,
    RelogioPontoListComponent,
    VendaCreateComponent,
    ProdutoCreateComponent,
    CurrencyPipe,
    CurrencyFormatDirective,
    ProdutoListComponent,
    VendaListComponent

    
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
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatDialogModule,
    MatAutocompleteModule,
    CommonModule,
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
