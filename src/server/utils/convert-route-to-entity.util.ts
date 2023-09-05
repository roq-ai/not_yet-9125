const mapping: Record<string, string> = {
  accesses: 'access',
  'audit-logs': 'audit_log',
  companies: 'company',
  invoices: 'invoice',
  settings: 'settings',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
