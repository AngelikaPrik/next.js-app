import { useState, SyntheticEvent, ChangeEvent } from 'react'
import { styled, Typography, TextField } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import CustomerForm from './forms/customer-form'
import { formContent } from '@/constants'
import OrganizationForm from './forms/organization-form'
import BankForm from './forms/bank-form'
import EmailsForm from './forms/emails-form'
import MetaForm from './forms/meta-form'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  width: '35rem',
  '&:before': {
    display: 'none',
  },
})

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  display: 'flex',
  flexDirection: 'column',
}))

export default function StyledAccordions() {
  const [expanded, setExpanded] = useState<string | false>('')

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <div>
      <Accordion onChange={handleChange(formContent.customer.exp)}>
        <AccordionSummary
          aria-controls={`${formContent.customer.exp}d-content`}
          id={`${formContent.customer.exp}d-header`}
        >
          <Typography>{formContent.customer.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CustomerForm />
        </AccordionDetails>
      </Accordion>

      <Accordion onChange={handleChange(formContent.org.exp)}>
        <AccordionSummary
          aria-controls={`${formContent.org.exp}d-content`}
          id={`${formContent.org.exp}d-header`}
        >
          <Typography>{formContent.org.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OrganizationForm />
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange(formContent.bank.exp)}>
        <AccordionSummary
          aria-controls={`${formContent.bank.exp}d-content`}
          id={`${formContent.bank.exp}d-header`}
        >
          <Typography>{formContent.bank.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <BankForm />
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange(formContent.emails.exp)}>
        <AccordionSummary
          aria-controls={`${formContent.emails.exp}d-content`}
          id={`${formContent.emails.exp}d-header`}
        >
          <Typography>{formContent.emails.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EmailsForm />
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange(formContent.meta.exp)}>
        <AccordionSummary
          aria-controls={`${formContent.meta.exp}d-content`}
          id={`${formContent.meta.exp}d-header`}
        >
          <Typography>{formContent.meta.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MetaForm />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export const InputField = ({
  title,
  name,
  value,
  onChange,
}: InputFieldProps) => {
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
    />
  )
}

interface InputFieldProps {
  title: string
  name: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
