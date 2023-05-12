import { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import StyledButton from './styled-button'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setModal } from '@/store/slices/modalSlice'

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

export default function Modal(props: PropsType) {
  const { title, textButton, onClick, children } = props
  const { modal } = useAppSelector(state => state.modalSlice)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModal(false))

  return (
    <BootstrapDialog onClose={handleClose} open={modal}>
      <StyledDialogTitle id='dialog-title' onClose={handleClose}>
        {title}
      </StyledDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <StyledButton onClick={onClick}>{textButton}</StyledButton>
      </DialogActions>
    </BootstrapDialog>
  )
}

interface PropsType {
  title: string
  textButton: string
  onClick: () => void
  children: ReactNode
}
