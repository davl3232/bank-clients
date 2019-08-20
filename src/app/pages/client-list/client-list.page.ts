import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {
  clients: Client[] = [];
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService
      .getClients()
      .subscribe(clients => (this.clients = clients));
  }

  formatDate(val: string) {
    return val.split('-').join('/');
  }
}
