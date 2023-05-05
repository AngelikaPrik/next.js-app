import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
  Typography,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import StyledButton from './styled-button'
import StyledAccordions from './accordion'

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
      {onClose ? (
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
      ) : null}
    </DialogTitle>
  )
}

export default function Modal() {
  const [open, setOpen] = useState(true)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={open}>
        <StyledDialogTitle id='dialog-title' onClose={handleClose}>
          Создание клиента
        </StyledDialogTitle>
        <DialogContent dividers>
          <StyledAccordions/>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <StyledButton>Создать</StyledButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
