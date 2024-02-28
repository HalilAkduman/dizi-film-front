import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnaSayfaComponent } from './components/ana-sayfa/ana-sayfa.component';
import { AdminHomeComponent } from './components/admin/add-category/admin-home/admin-home.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'giris-yap', pathMatch: 'full'
    },
    {
        path: 'giris-yap', component: LoginComponent
    },
    {
        path: 'kayıt-ol', component: RegisterComponent
    },
    {
        path: 'ana-sayfa', component: AnaSayfaComponent
    },
    {
        path: 'admin', component: AdminHomeComponent
    },
];
