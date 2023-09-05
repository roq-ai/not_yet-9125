import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AuditLogInterface {
  id?: string;
  action: string;
  entity: string;
  entity_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AuditLogGetQueryInterface extends GetQueryInterface {
  id?: string;
  action?: string;
  entity?: string;
  entity_id?: string;
  user_id?: string;
}
