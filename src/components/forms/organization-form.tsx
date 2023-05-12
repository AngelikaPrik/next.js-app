import { ChangeEvent } from 'react'

import { InputField } from '../input-field'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setClientForm } from '@/store/slices/customerSlice'
import { createForm } from './utils'

const forms = [
  createForm('Название организации','name','Введите название организации'),
  createForm('ИНН организации', 'inn', 'Введите ИНН организации'),
  createForm('КПП организации', 'kpp', 'Введите КПП организации'),
  createForm('ОГРН организации', 'ogrn', 'Введите ОГРН организации'),
  createForm('Юридический адрес', 'addr', 'Введите юридический адрес'),
]

export const OrganizationForm = () => {
  const { clientForm } = useAppSelector(state => state.customerSlice)
  const dispatch = useAppDispatch()

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(
      setClientForm({
        ...clientForm,
        organization: { ...clientForm.organization, [name]: value },
      })
    )
  }

  return (
    <>
      {forms.map(({ title, name }, i) => (
        <InputField
          key={i}
          title={title}
          name={name}
          value={clientForm.organization[name]}
          onChange={onChangeClient}
        />
      ))}
    </>
  )
}
