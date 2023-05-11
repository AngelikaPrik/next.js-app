import { configureStore } from '@reduxjs/toolkit'
import customerSlice from './slices/customerSlice'
import modalSlice from './slices/modalSlice'

export const store = configureStore({
  reducer: { customerSlice, modalSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
