import React from 'react'
import { InputBase, styled, alpha } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { observer } from 'mobx-react-lite'
import { customersStore } from '@/store'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${alpha(theme.palette.common.black, 0.15)}`,
  '&:hover': {
    border: `2px solid ${alpha(theme.palette.common.black, 0.25)}`,
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '5px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export const SearchItem = observer(() => {
  const onChangeFilteredData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    customersStore.setFilteredCustomers(value)
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Поиск…'
        onChange={onChangeFilteredData}
        value={customersStore.filteredCustomers}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
})
