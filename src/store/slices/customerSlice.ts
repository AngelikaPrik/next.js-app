import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  filteredData: string
  clientForm: Record<string, any>
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
    setFilteredData(state, { payload }) {
      state.filteredData = payload
    },
    setClientForm(state, { payload }) {
      state.clientForm = payload
    },
    setDefaultAccountForAll(state, { payload }) {
      const { bank_accounts } = state.clientForm;
  
      Object.keys(bank_accounts).forEach((key) => {
        const account = bank_accounts[key];
        account.is_default = key === payload;
      });
    },
  },
})

export const { setFilteredData, setClientForm, setDefaultAccountForAll } =
  customerSlice.actions
export default customerSlice.reducer
