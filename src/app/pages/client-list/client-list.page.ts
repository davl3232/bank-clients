import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { ClientSignupModalPage } from './client-signup-modal/client-signup-modal.page';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {
  clients: Client[] = [];
  constructor(
    private clientService: ClientService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.clientService
      .getClients()
      .subscribe(clients => (this.clients = clients));
  }

  async addClient() {
    const modal = await this.modalCtrl.create({
      component: ClientSignupModalPage,
    });
    return await modal.present();
  }

  formatDate(val: string) {
    return val
      .split('-')
      .reverse()
      .join('/');
  }
}
