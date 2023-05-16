import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

export const InputForm = (props: InputFormProps) => {
  const { title, name, value, onChange, helperText, error } = props
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
      error={error}
    />
  )
}

interface InputFormProps {
  title: string
  name: string
  value: string | number | boolean | null
  helperText?: string
  error?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
