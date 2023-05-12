import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  modal: boolean
}

const initialState: IInitialState = {
	modal: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal(state, { payload }:PayloadAction<boolean>) {
      state.modal = payload
    },
  },
})

export const { setModal } = modalSlice.actions
export default modalSlice.reducer
