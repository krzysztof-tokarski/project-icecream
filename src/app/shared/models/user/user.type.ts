import { Seller } from '@shared/models/user/seller.interface';
import { Client } from '@shared/models/user/client.interface';

export type User = Seller | Client;
