import { AppBar, Typography, Toolbar, styled, Box } from '@mui/material'
import StyledButton from '../styled-button'
import { observer } from 'mobx-react-lite'
import { modalStore } from '@/store'
import { SearchItem } from '../search-item'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: 'none',
}))

export const Header = observer(() => {
  const onToggleModal = () => modalStore.showModal()

  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          Клиенты
        </Typography>
        <Box mr={2}>
          <SearchItem />
        </Box>
        <Box width='200px'>
          <StyledButton onClick={onToggleModal}>
            + Добавить клиента
          </StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
})
