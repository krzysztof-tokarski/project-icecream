import { Injectable } from '@angular/core';
import { NewOrderFormValue } from './new-order-form.interface';

@Injectable({
  providedIn: 'root',
})
export class NewOrderProcessorService {
  public processOrder(newOrderFormValue: NewOrderFormValue) {}
}
