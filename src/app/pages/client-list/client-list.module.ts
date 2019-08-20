import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ClientListPage } from './client-list.page';
import { ClientSignupModalPageModule } from './client-signup-modal/client-signup-modal.module';

const routes: Routes = [
  {
    path: '',
    component: ClientListPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ClientSignupModalPageModule,
  ],
  declarations: [ClientListPage],
})
export class ClientListPageModule {}
