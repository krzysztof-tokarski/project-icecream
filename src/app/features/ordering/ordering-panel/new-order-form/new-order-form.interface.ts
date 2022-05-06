import { Unit } from './../../../../shared/models/ice-cream/unit.interface';
import { Icecream } from './../../../../shared/models/ice-cream/icecream.interface';
export interface NewOrderFormValue {
  icecream: Icecream;
  unit: Unit;
  amount: string;
}
