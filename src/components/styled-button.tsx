import { Button } from '@mui/material'

export default function StyledButton({ children }: PropsType) {
  return (
    <Button variant='contained' sx={{ boxShadow: 'none', ml: '1rem' }}>
      {children}
    </Button>
  )
}

interface PropsType {
  children: String
}
