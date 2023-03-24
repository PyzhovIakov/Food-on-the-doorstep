import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AuthContext from './../../context/AuthContext'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Contacts() {
  const ContextAuth = useContext(AuthContext)

  const rows = [
    { _id: '1', key: 'Телефон', value: '79601235784' },
    { _id: '2', key: 'Почта', value: 'Email@test.com' }
  ]

  return (
    <Box sx={{ width: '50vw', margin: '20px auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: '20px 0px' }}>
        <h1>Контакты</h1>
        <div>
          {
            ContextAuth.role === 'admin' ?
              <Button variant="contained" color="success" sx={{ borderRadius: '15px', m: '20px 5px' }} startIcon={<AddIcon />}>
                Добавить
              </Button>
              : null
          }
        </div>
      </Stack>
      <TableContainer component={Paper} >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Название</StyledTableCell>
              <StyledTableCell align="right">Значение</StyledTableCell>
              {
                ContextAuth.role === 'admin' ? <StyledTableCell align="right">Действие</StyledTableCell> : null
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.key}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
                {
                  ContextAuth.role === 'admin' ?
                    <StyledTableCell align="right">
                      <Button variant="contained" color="success" sx={{ borderRadius: '50%', mr: 1, p: '10px', minWidth: 0 }}>
                        <EditIcon />
                      </Button>
                      <Button variant="contained" color="success" sx={{ borderRadius: '50%', ml: 1, p: '10px', minWidth: 0 }}>
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                    : null
                }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}