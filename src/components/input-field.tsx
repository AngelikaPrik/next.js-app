import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

export const InputField = (props: InputFieldProps) => {
  const { title, name, value, onChange, helperText } = props
  return (
    <TextField
      required
      label={title}
      name={name}
      size='small'
      fullWidth
      margin='normal'
      value={value || ''}
      onChange={onChange}
      helperText={helperText}
    />
  )
}

interface InputFieldProps {
  title: string
  name: string
  value: string | number | boolean | null
  helperText: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
