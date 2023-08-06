import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { AuthGuard } from './auth/auth.guard';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { LoginComponent } from './components/login/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { LoginRecuperarComponent } from './components/login/login-recuperar/login-recuperar.component';
import { LoginAlterarComponent } from './components/login/login-alterar/login-alterar.component';
import { RelatorioUsuarioComponent } from './components/relatorio/relatorio-autitoria/relatorio-autitoria.component';
import { PacienteCreateComponent } from './components/paciente/paciente-create/paciente-create.component';
import { PacienteListComponent } from './components/paciente/paciente-list/paciente-list.component';
import { PacienteUpdateComponent } from './components/paciente/paciente-update/paciente-update.component';
import { PacienteDeleteComponent } from './components/paciente/paciente-delete/paciente-delete.component';
const routes: Routes = [
    { path : 'login', component: LoginComponent },
    { path : 'login-recuperar', component: LoginRecuperarComponent },
    { path : 'login-alterar/:uid', component: LoginAlterarComponent },
    {
        path: '', component: NavComponent, canActivate: [AuthGuard], children: [
            { path: 'home', component: HomeComponent },

        
            { path: 'relatorio', component: RelatorioUsuarioComponent },

            { path: 'pacientes', component: PacienteListComponent },
            { path: 'pacientes/create', component: PacienteCreateComponent },
            { path: 'pacientes/update/:id', component: PacienteUpdateComponent },
            { path: 'pacientes/delete/:id', component: PacienteDeleteComponent},

            { path: 'tecnicos', component: TecnicoListComponent },
            { path: 'tecnicos/create', component: TecnicoCreateComponent },
            { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
            { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

            { path: 'clientes', component: ClienteListComponent },
            { path: 'clientes/create', component: ClienteCreateComponent },
            { path: 'clientes/update/:id', component: ClienteUpdateComponent },
            { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

            { path: 'chamados', component:   ChamadoListComponent },
            { path: 'chamados/create', component:   ChamadoCreateComponent},
            { path: 'chamados/update/:id',            component:   ChamadoUpdateComponent },
            { path: 'chamados/read/:id', component: ChamadoReadComponent }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }