import { ICustomerRequest, IFormStore } from '@/models'
import { makeAutoObservable } from 'mobx'

const initialCustomerData: IFormStore = {
  customer: { name: '', email: '', deferral_days: null, credit_limit: null },
  organization: { name: '', inn: '', kpp: '', ogrn: '', addr: '' },
  bank_accounts: {
    main: {
      name: '',
      bik: '',
      account_number: '',
      corr_account_number: '',
      is_default: false,
    },
  },
  metadata: {},
  invoice_prefix: 'invoice_prefix',
  invoice_emails: { main: '' },
}

export class CustomersStore {
  filteredCustomers: string = ''
  customerData: IFormStore = initialCustomerData

  constructor() {
    makeAutoObservable(this)
  }

  setFilteredCustomers(value: string) {
    this.filteredCustomers = value
  }

  setCustomerKey(name: string, value: string) {
    const { customer } = this.customerData
    customer[name] = value
  }

  setOrganizationKey(name: string, value: string) {
    const { organization } = this.customerData
    organization[name] = value
  }

  setBankAccountsKey(key: string, name: string, value: string) {
    const { bank_accounts } = this.customerData
    const valueForm = {
      name: '',
      bik: '',
      account_number: '',
      corr_account_number: '',
      is_default: false,
    }

    if (!name) bank_accounts[key] = valueForm
    if (name == 'is_default') {
      bank_accounts[key].is_default = !bank_accounts[key].is_default
    }

    bank_accounts[key][name] = value
  }

  removeBankAccountKey(key: string) {
    const { bank_accounts } = this.customerData
    delete bank_accounts[key]
  }

  setDefaultAccountForAll(key: string) {
    const { bank_accounts } = this.customerData

    Object.keys(bank_accounts).forEach(k => {
      const account = bank_accounts[k]
      account.is_default = k === key
    })
  }

  setEmailsKey(key: string, value: string) {
    const { invoice_emails } = this.customerData
    invoice_emails[key] = value
  }

  removeEmailKey(key: string) {
    const { invoice_emails } = this.customerData
    delete invoice_emails[key]
  }

  setMetaKey(key: string, name: string, value: string) {
    const { metadata } = this.customerData
    if (!name) metadata[key] = { key: '', value: '' }
    metadata[key][name] = value
  }

  removeMetaKey(key: string) {
    const { metadata } = this.customerData
    delete metadata[key]
  }

  get convertCustomerData(): ICustomerRequest {
    const { customer, organization, bank_accounts } = this.customerData

    const data: ICustomerRequest = {
      name: customer.name as string,
      email: customer.email as string,
      deferral_days: customer.deferral_days as number,
      credit_limit: customer.credit_limit as number,
      organization: {
        name: organization.name,
        inn: organization.inn,
        kpp: organization.kpp,
        ogrn: organization.ogrn,
        addr: organization.addr,
        bank_accounts: Object.keys(bank_accounts).map(key => {
          const account = bank_accounts[key]
          return {
            name: account.name as string,
            bik: account.bik as string,
            account_number: account.account_number as string,
            corr_account_number: account.corr_account_number as string,
            is_default: account.is_default as boolean,
          }
        }),
      },
      metadata: Object.entries(this.customerData.metadata).reduce(
        (result: Record<string, string>, [k, v]) => {
          result[v.key] = v.value
          return result
        },
        {}
      ),
      invoice_emails: Object.values(this.customerData.invoice_emails),
      invoice_prefix: this.customerData.invoice_prefix,
    }
    return data
  }

  setInitialData() {
    this.customerData = initialCustomerData
  }
}
