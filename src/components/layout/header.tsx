import { AppBar, Typography, Toolbar, styled, Box } from '@mui/material'
import SearchItem from '../search-item'
import StyledButton from '../styled-button'
import { useAppSelector } from '@/hooks/redux'
import { useDispatch } from 'react-redux'
import { setModal } from '@/store/slices/modalSlice'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  boxShadow: 'none',
}))

export default function Header() {
  const { modal } = useAppSelector(state => state.modalSlice)
  const dispatch = useDispatch()

  const onToggleModal = () => dispatch(setModal(!modal))

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
}
