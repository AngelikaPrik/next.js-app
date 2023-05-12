import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type FormType = Record<string, string | number | null | boolean>
export type FormMapType = { [key: string]: FormType }
export interface IClientForm {
  customer: FormType
  organization: FormType
  bank_accounts: FormMapType
  metadata: FormMapType
  invoice_prefix: string
  invoice_emails: FormType
}
interface IInitialState {
  filteredData: string
  clientForm: IClientForm
}

const initialState: IInitialState = {
  filteredData: '',
  clientForm: {
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
    invoice_prefix: '',
    invoice_emails: { main: '' },
  },
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setFilteredData(state, { payload }: PayloadAction<string>) {
      state.filteredData = payload
    },
    setClientForm(state, { payload }: PayloadAction<IClientForm>) {
      state.clientForm = payload
    },
    setDefaultAccountForAll(state, { payload }: PayloadAction<string>) {
      const { bank_accounts } = state.clientForm

      Object.keys(bank_accounts).forEach(key => {
        const account = bank_accounts[key]
        account.is_default = key === payload
      })
    },
  },
})

export const { setFilteredData, setClientForm, setDefaultAccountForAll } =
  customerSlice.actions
export default customerSlice.reducer
