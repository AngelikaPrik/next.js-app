import { ChangeEvent, useState } from 'react'
import { InputForm } from '../input-form'
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
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const { organization } = customersStore.customerData

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const valideValue = name == 'name' ? value 
    : name == 'addr' ? value : value.replace(/\D/g, '')
    
    customersStore.setOrganizationKey(name, valideValue)

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
          value={organization[name]}
          onChange={e => onChangeClient(e)}
        />
      ))}
    </>
  )
})
