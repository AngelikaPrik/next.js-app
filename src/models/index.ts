export type CustomerStatus = "active" | "inactive"

export interface Balance {
  currency: string
  current_amount: number
  credit_limit: number
  available_amount: number
}
export interface BankAccount {
  id: string
  name: string
  bik: string
  account_number: string
  corr_account_number: string
  is_default: boolean
  created_at: string
  updated_at: string
}
export interface Oraganisation {
  id: string
  name: string
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
  org: Oraganisation
  balance: Balance
  metadata: Record<string, string>
  created_at: string
  updated_at: string
  status: CustomerStatus
  invoice_prefix: string
  invoice_emails: string[]
}