import React, { ChangeEvent } from 'react'

import { formContent } from '@/constants'
import { InputField } from '../accordion'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setClientForm } from '@/store/slices/customerSlice'

export default function CustomerForm() {
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
      {formContent.customer.forms.map(({ title, name }, i) => (
        <InputField
          key={i}
          title={title}
          name={name}
          value={clientForm.customer[name]}
          onChange={onChangeClient}
        />
      ))}
    </>
  )
}
