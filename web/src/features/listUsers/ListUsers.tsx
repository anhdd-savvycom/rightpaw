import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchUsersDataAsync, totalPages, User } from '../../state/listUsers';
import { users } from './../../state/listUsers/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, MenuItem, Pagination } from '@mui/material';
import TextField from '@mui/material/TextField';
const statesOfUser = [
    {
        value: 'VIC',
        label: 'VIC',
    },
    {
        value: 'NSW',
        label: 'NSW',
    },
    {
        value: 'ACT',
        label: 'ACT',
    },
    {
        value: 'QLD',
        label: 'QLD',
    },
];

const petExps = [
    {
        value: 'Y',
        label: 'Y',
    },
    {
        value: 'N',
        label: 'N',
    },
]

const ListUsers = () => {
    const limit = 5
    const dispatch = useAppDispatch();
    const usersData = useAppSelector(users)
    const totalPage=useAppSelector(totalPages)
    const handleUsers = (state: string, exp: string, name: string, email: string, limit: number, offset: number) => {
        dispatch(fetchUsersDataAsync(state, exp, name, email, limit, offset))
    }
    const [page, setPage] = useState<number>(0);
    const [nameSearch, setNameSearch] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [exp, setExp] = useState<string>("")
    useEffect(() => {
        handleUsers(state, exp, nameSearch, email, limit, page)
    }, [dispatch])

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage-1);
        handleUsers(state, exp, nameSearch, email, limit, newPage-1)
    };

    const handleSearchFullName = (key: string) => {
        setNameSearch(key);
        setPage(0)
        handleUsers(state, exp, key, email, limit, page)
    };
    const handleSearchEmail = async (key: string) => {
        setEmail(key);
        handleUsers(state, exp, nameSearch, key, limit, page)
        setPage(0)
    };
    const handleChangeStateOfUser = (event: any) => {
        setState(event.target.value);
        handleUsers(event.target.value, exp, nameSearch, email, limit, page)
        setPage(0)
    };
    const handleChangeExp=(event:any)=>{
        setExp(event.target.value);
        handleUsers(state, event.target.value, nameSearch, email, limit, page)
        setPage(0)
    }
    return <div>
        <Box sx={{ display: 'flex', margin: '50px 0px', justifyContent: 'space-between' }}>
            <TextField id="outlined-basic" label="FullName" variant="outlined"
                value={nameSearch}
                onChange={(e) => { handleSearchFullName(e.target.value) }}
            />
            <TextField id="outlined-basic-2" label="Email" variant="outlined"
                value={email}
                onChange={(e) => { handleSearchEmail(e.target.value) }}
            />
            <TextField
                id="outlined-select-currency"
                select
                label="State"
                value={state}
                onChange={handleChangeStateOfUser}
                style={{ width: '20%' }}
            >
                {statesOfUser.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="outlined-select-currency"
                select
                label="Pet experience"
                value={exp}
                onChange={handleChangeExp}
                style={{ width: '20%' }}
            >
                {petExps.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">Pet Experience</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData.map((item, i) => (
                        <TableRow
                            key={item.uuid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {item.uuid}
                            </TableCell>
                            <TableCell align="center">{item.firstName}</TableCell>
                            <TableCell align="center">{item.lastName}</TableCell>
                            <TableCell align="center">{item.email}</TableCell>
                            <TableCell align="center">{item.state}</TableCell>
                            <TableCell align="center">{item.petExp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box style={{ marginTop: 50, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
                onChange={handleChangePage}
                count={totalPage}
                color="primary"
                page={page + 1}
            />
        </Box>
    </div>
}

export default ListUsers;
