import { ChangeEvent } from 'react'

import { InputField } from '../input-field'
import { createForm } from './utils'
import { observer } from 'mobx-react-lite'
import { customersStore } from '@/store'

const forms = [
  createForm('Название организации', 'name', 'Введите название организации'),
  createForm('ИНН организации', 'inn', 'Введите ИНН организации'),
  createForm('КПП организации', 'kpp', 'Введите КПП организации'),
  createForm('ОГРН организации', 'ogrn', 'Введите ОГРН организации'),
  createForm('Юридический адрес', 'addr', 'Введите юридический адрес'),
]

export const OrganizationForm = observer(() => {
  const { organization } = customersStore.customerData

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    customersStore.setOrganizationKey(name, value)
  }

  return (
    <>
      {forms.map(({ title, name }, i) => (
        <InputField
          key={i}
          title={title}
          name={name}
          value={organization[name]}
          onChange={onChangeClient}
        />
      ))}
    </>
  )
})
