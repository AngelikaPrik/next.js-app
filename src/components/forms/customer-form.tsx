import { ChangeEvent, useState } from 'react'
import { InputForm } from '../input-form'
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
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const { customer } = customersStore.customerData

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const valideValue = name == 'name' ? value 
    : name == 'email' ? value : value.replace(/\D/g, '')
    
    customersStore.setCustomerKey(name, valideValue)

    if (!value) setErrors(prev => ({ ...prev, [name]: true }))
    else setErrors(prev => ({ ...prev, [name]: false }))
  }

  return (
    <>
      {forms.map(({ title, name, helper_text }, i) => (
        <InputForm
          key={i}
          title={title}
          name={name}
          helperText={errors[name] ? helper_text : ''}
          error={errors[name]}
          value={customer[name]}
          onChange={e => onChangeClient(e)}
        />
      ))}
    </>
  )
})
