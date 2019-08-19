import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss'],
})
export class ClientListPage implements OnInit {
  clients: Client[] = [
    new Client(
      '1',
      '1111111111',
      'David Alonso',
      'Villamizar Lizcano',
      '26-11-1995',
    ),
    new Client('2', '2222222222', 'Andrés Felipe', 'Lopez Díaz', '13-04-1984'),
    new Client(
      '3',
      '3333333333',
      'Miguel Antonio',
      'Suarez Espinosa',
      '02-05-1979',
    ),
    new Client(
      '4',
      '4444444444',
      'Maria Fernanda',
      'Valencia Torres',
      '01-10-1960',
    ),
    new Client('5', '5555555555', 'Laura', 'Antolinez Urquijo', '16-06-1969'),
  ];
  constructor(/* TODO: private clientService: ClientService */) {}

  ngOnInit() {
    // TODO: this.clientService.getClients().subscribe();
  }

  formatDate(val: string) {
    return val.split('-').join('/');
  }
}
