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
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';


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

import { AdminComponent } from './components/admin/admin/admin.component';


const routes: Routes = [
    { path : 'login', component: LoginComponent },
    { path : 'login-recuperar', component: LoginRecuperarComponent },
    { path : 'login-alterar/:uid', component: LoginAlterarComponent },
    {
        path: '', component: NavComponent, canActivate: [AuthGuard], children: [
            { path: 'home', component: HomeComponent },

            { path: 'usuarios', component: UsuarioListComponent },
            { path: 'usuarios/create', component: UsuarioCreateComponent },
            { path: 'usuarios/update/:id', component: UsuarioUpdateComponent },


            { path: 'usuarios/delete/:id', component: UsuarioDeleteComponent },


            { path: 'clinicas', component: ClinicaListComponent },
            { path: 'clinicas/create', component: ClinicaCreateComponent },
            { path: 'clinicas/update/:id', component: ClinicaUpdateComponent },

            { path: 'convenios', component: ConvenioListComponent },
            { path: 'convenios/create', component: ConvenioCreateComponent },
            { path: 'convenios/update/:id', component: ConvenioUpdateComponent },
            { path: 'convenios/delete/:id', component: ConvenioDeleteComponent },

            { path: 'especialidades', component: EspecialidadeListComponent },
            { path: 'especialidades/create', component: EspecialidadeCreateComponent },
            { path: 'especialidades/update/:id', component: EspecialidadeUpdateComponent },
            { path: 'especialidades/delete/:id', component: EspecialidadeDeleteComponent },


            { path: 'administrador', component: AdminComponent },

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