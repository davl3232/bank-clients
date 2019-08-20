import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.fetchClients();
  }

  async fetchClients() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando clientes...',
    });
    await loading.present();

    this.clients = await this.clientService.getClients().toPromise();

    await loading.dismiss();
  }

  async refreshClients(event: any) {
    await this.fetchClients();
    event.target.complete();
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
