import { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
  IconButton,
  Box,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import StyledButton from './styled-button'
import { observer } from 'mobx-react-lite'
import { modalStore } from '@/store'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function StyledDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  )
}

export const Modal = observer((props: PropsType) => {
  const { title, textButton, onClick, children, notify } = props
  const { modal } = modalStore

  const handleClose = () => modalStore.closeModal()

  return (
    <BootstrapDialog onClose={handleClose} open={modal}>
      <StyledDialogTitle id='dialog-title' onClose={handleClose}>
        {title}
      </StyledDialogTitle>
      <DialogContent dividers>
        {children}
        {notify && (
          <Typography color='error' textAlign='center'>
            Заполните все обязательные поля
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <Box>
          <StyledButton onClick={onClick}>{textButton}</StyledButton>
        </Box>
      </DialogActions>
    </BootstrapDialog>
  )
})
interface PropsType {
  title: string
  textButton: string
  notify?: boolean
  onClick: () => void
  children: ReactNode
}
