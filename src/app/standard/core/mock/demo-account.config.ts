// MOCK — powers the "switch account" control in the profile dropdown (see standard-header component).
// Lets a demo viewer flip between the two personas without retyping credentials. Remove this file
// and its usages once real auth/role switching replaces the mock login flow.
export type DemoAccountRole = 'platform' | 'company';

export interface DemoAccount {
  role: DemoAccountRole;
  username: string;
  password: string;
  label: string;
}

export const DEMO_ACCOUNTS: Record<DemoAccountRole, DemoAccount> = {
  platform: { role: 'platform', username: 'admin', password: 'mock1234', label: 'Platform Admin' },
  company: { role: 'company', username: 'company.admin', password: 'mock1234', label: 'Company Admin' },
};

export const DEFAULT_DEMO_ROLE: DemoAccountRole = 'company';
