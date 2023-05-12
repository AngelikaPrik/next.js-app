import React, { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setClientForm } from '@/store/slices/customerSlice'
import { InputField } from '../input-field'
import { createForm } from './utils'

const forms = [
  createForm('Имя', 'name', 'Введите имя'),
  createForm('Email', 'email', 'Введите email'),
  createForm(
    'Дней отстрочки',
    'deferral_days',
    'Дней отсрочки должно быть больше или равно нулю'
  ),
  createForm(
    'Кредитный лимит',
    'credit_limit',
    'Кредитный лимит должен быть больше или равен нулю'
  ),
]

export const CustomerForm = () => {
  const { clientForm } = useAppSelector(state => state.customerSlice)
  const dispatch = useAppDispatch()

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(
      setClientForm({
        ...clientForm,
        customer: { ...clientForm.customer, [name]: value },
      })
    )
  }

  return (
    <>
      {forms.map(({ title, name, helper_text }, i) => (
        <InputField
          key={i}
          title={title}
          name={name}
          helperText={helper_text}
          value={clientForm.customer[name]}
          onChange={onChangeClient}
        />
      ))}
    </>
  )
}
