import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientSignupModalPage } from './client-signup-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ClientSignupModalPage],
  entryComponents: [ClientSignupModalPage],
})
export class ClientSignupModalPageModule {}
