import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'

export default function CategoryHeader(props) {
    const [Sort, setSort] = useState('');

    const handleChangeSort = (event) => {
        setSort(event.target.value)
        props.Sorting(event.target.value, props.title)
    }

    return (
        <Stack direction="row" spacing={2} sx={{ m: 2 }}>
            <h1 style={{ padding: 0, margin: '5px' }}>{props.title}</h1>
            <FormControl  sx={{ minWidth: '160px' }} size={'small'}>
                <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={Sort}
                    label="Сортировка"
                    onChange={handleChangeSort}
                    name="sort"
                >
                    <MenuItem value={'none'}>Нет</MenuItem>
                    <MenuItem value={'min'}>Цена min</MenuItem>
                    <MenuItem value={'max'}>Цена max</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    )
}