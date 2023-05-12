import { useState, SyntheticEvent, ReactNode } from 'react'
import { styled, Typography } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import {
  CustomerForm,
  OrganizationForm,
  BankForm,
  EmailsForm,
  MetaForm,
} from './forms'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  width: '35rem',
  '&:before': { display: 'none' },
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

function createData(exp: string, title: string, component: ReactNode) {
  return { exp, title, component }
}

const accordionsArray = [
  createData('customer', 'Детали клиента', <CustomerForm />),
  createData('org', 'Детали организации', <OrganizationForm />),
  createData('bank', 'Банковские счета', <BankForm />),
  createData('invoice_emails', 'Emails для счетов', <EmailsForm />),
  createData('meta', 'Meta', <MetaForm />),
]

export default function StyledAccordions() {
  const [expanded, setExpanded] = useState<string | false>('')

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <>
      {accordionsArray.map(({ exp, title, component }) => (
        <Accordion onChange={handleChange(exp)} key={exp}>
          <AccordionSummary id={`${exp}d-header`}>
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{component}</AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
