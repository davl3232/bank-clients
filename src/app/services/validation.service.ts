import { Injectable } from '@angular/core';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  isString = (val: any) => typeof val === 'string';

  isValidDate = (val: any) =>
    this.isString(val) &&
    /^\d\d\d\d-((0[1-9])|1[0-2])-((0[1-9])|(1\d)|(2\d)|3[0-1])$/.test(val);

  isOlderThan18 = (val: string) => {
    const date18YearsAgo = new Date();
    date18YearsAgo.setUTCHours(0, 0, 0, 0);
    date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);
    return new Date(val) < date18YearsAgo;
  };

  isValidBirthdate = (val: any) =>
    this.isValidDate(val) && this.isOlderThan18(val);

  isValidIdentification = (val: any) => this.isString(val) && /^\d+$/.test(val);

  isValidName = (val: any) => this.isString(val) && /[~\w]+/.test(val);

  isValidClient = (client: Client) =>
    this.isValidBirthdate(client.birthdate) &&
    this.isValidIdentification(client.identification) &&
    this.isValidName(client.firstname) &&
    this.isValidName(client.lastname);
}
