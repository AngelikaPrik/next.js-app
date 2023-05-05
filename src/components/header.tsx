import { AppBar, Typography, Toolbar, styled } from '@mui/material'
import SearchItem from './search-item'
import StyledButton from './styled-button'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: 'none',
}))

export default function Header() {
  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          Клиенты
        </Typography>
        <SearchItem />
        <StyledButton>+ Добавить клиента</StyledButton>
      </Toolbar>
    </StyledAppBar>
  )
}
