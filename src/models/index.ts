export type CustomerStatus = 'active' | 'inactive'

export interface Balance {
  currency: string
  current_amount: number
  credit_limit: number
  available_amount: number
}
export interface BankAccount {
  id: string
  account_name: string
  bik: string
  account_number: string
  corr_account_number: string
  is_default: boolean
  created_at: string
  updated_at: string
}
export interface Organization {
  id: string
  org_name: string
  inn: string
  kpp: string
  ogrn: string
  addr: string
  bank_accounts: BankAccount[]
  created_at: string
  updated_at: string
}
export interface Customer {
  id: string
  name: string
  email: string
  deferral_days: number
  org: Organization
  balance: Balance
  metadata: Record<string, string>
  created_at: string
  updated_at: string
  status: CustomerStatus
  invoice_prefix: string
  invoice_emails: string[]
}

export interface ListCustomersResponse {
  customers: Customer[]
}

export interface CustomerRequest {
  name: string
  email: string
  deferral_days: number | null
  credit_limit: number | null
  organization: OrganizationRequest
  metadata: Record<string, string>
  invoice_emails: string[]
  invoice_prefix: string
}

export interface OrganizationRequest {
  name: string
  inn: string
  kpp: string
  ogrn: string
  addr: string
  bank_accounts: BankAccountRequest[]
}

export interface BankAccountRequest {
  name: string
  bik: string
  account_number: string
  corr_account_number: string
  is_default: boolean
}
