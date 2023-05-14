import { ChangeEvent } from 'react';
import { InputField } from '../input-field'
import { createForm } from './utils'
import { observer } from 'mobx-react-lite'
import { customersStore } from '@/store'

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

export const CustomerForm = observer(() => {
  const { customer } = customersStore.customerData

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    customersStore.setCustomerKey(name, value)
  }

  return (
    <>
      {forms.map(({ title, name, helper_text }, i) => (
        <InputField
          key={i}
          title={title}
          name={name}
          helperText={helper_text}
          error={false}
          value={customer[name]}
          onChange={onChangeClient}
        />
      ))}
    </>
  )
})
