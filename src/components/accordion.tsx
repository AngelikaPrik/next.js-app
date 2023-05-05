import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

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
}))

const accrodionsArray = [
  { title: 'Детали клиента', exp: 'client', details: '12345' },
  { title: 'Детали организации', exp: 'org', details: '12345' },
  { title: 'Банковские счета', exp: 'bank', details: '12345' },
  { title: 'Emails для счетов', exp: 'emails', details: '12345' },
  { title: 'Meta', exp: 'meta', details: '12345' },
]

export default function StyledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('')

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <div>
      {accrodionsArray.map(({ title, exp, details }) => {
        return (
          <Accordion
            key={title}
            expanded={expanded === exp}
            onChange={handleChange(exp)}
          >
            <AccordionSummary
              aria-controls={`${title}d-content`}
              id={`${title}d-header`}
            >
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{details}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}
