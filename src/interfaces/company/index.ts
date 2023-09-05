import { AccessInterface } from 'interfaces/access';
import { InvoiceInterface } from 'interfaces/invoice';
import { SettingsInterface } from 'interfaces/settings';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  access?: AccessInterface[];
  invoice?: InvoiceInterface[];
  settings?: SettingsInterface[];
  user?: UserInterface;
  _count?: {
    access?: number;
    invoice?: number;
    settings?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
