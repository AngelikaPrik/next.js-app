import React from 'react'
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
import StyledAccordions from './accordion'
import { postCustomer } from '@/service/customer-service'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setModal } from '@/store/slices/modalSlice'
import { CustomerRequest } from '@/models'

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

export default function Modal() {
  const { modal } = useAppSelector(state => state.modalSlice)
  const { clientForm } = useAppSelector(state => state.customerSlice)
  const dispatch = useAppDispatch()
  const handleClose = () => dispatch(setModal(false))

  function convertClientFormToRequest(): CustomerRequest {
    const {
      customer,
      organization,
      bank_accounts,
      metadata,
      invoice_emails,
      invoice_prefix,
    } = clientForm

    const customerRequest: CustomerRequest = {
      name: customer.name,
      email: customer.email,
      deferral_days: customer.deferral_days,
      credit_limit: customer.credit_limit,
      organization: {
        name: organization.name,
        inn: organization.inn,
        kpp: organization.kpp,
        ogrn: organization.ogrn,
        addr: organization.addr,
        bank_accounts: Object.keys(bank_accounts).map(key => {
          const account = bank_accounts[key]
          return {
            name: account.name,
            bik: account.bik,
            account_number: account.account_number,
            corr_account_number: account.corr_account_number,
            is_default: account.is_default,
          }
        }),
      },
      metadata,
      invoice_emails: Object.values(invoice_emails),
      invoice_prefix,
    }

    console.log(customerRequest)
    return customerRequest
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={modal}>
        <StyledDialogTitle id='dialog-title' onClose={handleClose}>
          Создание клиента
        </StyledDialogTitle>
        <DialogContent dividers>
          <StyledAccordions />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <StyledButton onClick={() => convertClientFormToRequest(clientForm)}>
            Создать
          </StyledButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
