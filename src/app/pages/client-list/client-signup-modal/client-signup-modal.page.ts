import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ClientService } from 'src/app/services/client.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-client-signup-modal',
  templateUrl: './client-signup-modal.page.html',
  styleUrls: ['./client-signup-modal.page.scss'],
})
export class ClientSignupModalPage implements OnInit {
  monthShortNames = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ];

  identification = '';
  firstname = '';
  lastname = '';
  birthdate = '';

  constructor(
    private clientService: ClientService,
    private validationService: ValidationService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {}

  async showAlert(options: AlertOptions) {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
  }

  async createClient() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando datos de cliente...',
    });
    await loading.present();

    const newClient = {
      identification: this.identification,
      firstname: this.firstname,
      lastname: this.lastname,
      birthdate: this.birthdate.split('T')[0],
    };

    const alertOptions: AlertOptions = {
      header: 'Campo no válido:',
      buttons: ['Aceptar'],
    };

    if (
      !this.validationService.isValidIdentification(newClient.identification)
    ) {
      await loading.dismiss();
      await this.showAlert({
        ...alertOptions,
        subHeader: 'Identificación',
        message: 'Debe ser un número sin decimales.',
      });
      return;
    }
    if (!this.validationService.isValidName(newClient.firstname)) {
      await loading.dismiss();
      await this.showAlert({
        ...alertOptions,
        subHeader: 'Nombre',
        message: 'Debe estar diligenciado.',
      });
      return;
    }
    if (!this.validationService.isValidName(newClient.lastname)) {
      await loading.dismiss();
      await this.showAlert({
        ...alertOptions,
        subHeader: 'Apellido',
        message: 'Debe estar diligenciado.',
      });
      return;
    }
    if (newClient.birthdate === '') {
      await loading.dismiss();
      await this.showAlert({
        ...alertOptions,
        subHeader: 'Fecha de nacimiento',
        message: 'Debe estar diligenciada.',
      });
      return;
    }
    if (!this.validationService.isOlderThan18(newClient.birthdate)) {
      await loading.dismiss();
      await this.showAlert({
        ...alertOptions,
        subHeader: 'Fecha de nacimiento',
        message:
          'El cliente debe tener más de 18 años para poder registrarse en el banco.',
      });
      return;
    }

    try {
      await this.clientService
        .addClient({
          ...newClient,
          birthdate: newClient.birthdate
            .split('-')
            .reverse()
            .join('-'),
        })
        .toPromise();
    } catch (e) {
      await loading.dismiss();
      await this.showAlert({
        ...alertOptions,
        subHeader: 'Identificación',
        message: `Ya existe un cliente con la identificación "${
          this.identification
        }".`,
      });
      return;
    }

    await loading.dismiss();

    const toast = await this.toastCtrl.create({
      color: 'success',
      message: 'Cliente registrado exitosamente.',
      duration: 2000,
    });
    await toast.present();

    await this.modalCtrl.dismiss();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
