import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface SettingsInterface {
  id?: string;
  invoice_due_days: number;
  currency: string;
  timezone: string;
  language: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface SettingsGetQueryInterface extends GetQueryInterface {
  id?: string;
  currency?: string;
  timezone?: string;
  language?: string;
  company_id?: string;
}
