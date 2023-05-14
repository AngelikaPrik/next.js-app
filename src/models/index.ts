export type CustomerStatus = 'active' | 'inactive'

export interface IBalance {
  currency: string
  current_amount: number
  credit_limit: number
  available_amount: number
}
export interface IBankAccount {
  id: string
  account_name: string
  bik: string
  account_number: string
  corr_account_number: string
  is_default: boolean
  created_at: string
  updated_at: string
}
export interface IOrganization {
  id: string
  org_name: string
  inn: string
  kpp: string
  ogrn: string
  addr: string
  bank_accounts: IBankAccount[]
  created_at: string
  updated_at: string
}
export interface ICustomer {
  id: string
  name: string
  email: string
  deferral_days: number
  org: IOrganization
  balance: IBalance
  metadata: Record<string, string>
  created_at: string
  updated_at: string
  status: CustomerStatus
  invoice_prefix: string
  invoice_emails: string[]
}

export interface IListCustomersResponse {
  customers: ICustomer[]
}

export interface ICustomerRequest {
  name: string
  email: string
  deferral_days: number | null
  credit_limit: number | null
  organization: IOrganizationRequest
  metadata: Record<string, string>
  invoice_emails: string[]
  invoice_prefix: string
}

export interface IOrganizationRequest {
  name: string
  inn: string
  kpp: string
  ogrn: string
  addr: string
  bank_accounts: IBankAccountRequest[]
}

export interface IBankAccountRequest {
  name: string
  bik: string
  account_number: string
  corr_account_number: string
  is_default: boolean
}
