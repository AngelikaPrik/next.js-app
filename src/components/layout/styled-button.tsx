import { Button } from '@mui/material'

export default function StyledButton({
  opacityButton,
  disabled,
  children,
  onClick,
}: PropsType) {
  return (
    <Button
      variant='contained'
      disabled={disabled}
      sx={
        opacityButton
          ? {
              bgcolor: 'transparent',
              border: '2px dashed #ccc',
              boxShadow: 'none',
              color: 'black',
              width: '100%',
              '&:hover': {
                bgcolor: 'transparent',
                border: '2px dashed #252525',
                boxShadow: 'none',
              },
            }
          : { boxShadow: 'none', width: '100%' }
      }
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

interface PropsType {
  children: String | React.ReactNode
  onClick: () => void
  opacityButton?: boolean
  disabled?: boolean
}
