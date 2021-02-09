import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import users
import {UserEditComponent} from './components/user_edit.component';

const appRoutes: Routes = [
    {path: '', component: UserEditComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: UserEditComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);