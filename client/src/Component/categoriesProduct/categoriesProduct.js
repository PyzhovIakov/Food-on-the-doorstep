import React from 'react'
import Carousel from './../Сarousel/Сarousel'
import ProductCard from './ProductCard/ProductCard'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'

export default function CategoriesProduct(props) {

    const handleChange = (event, key) => {
        if (event.target.value === 1) {

        }
        if (event.target.value === 2) {
            props.product[key].sort(function (a, b) {
                return a.price - b.price;
            });
        }
        if (event.target.value === 3) {
            props.product[key].sort(function (a, b) {
                return b.price - a.price;
            });
        }
    };

    return (
        <div>
            {
                Object.keys(props.product).map((key) => (
                    <div key={key} style={{ marginTop: '20px' }}>
                        <Stack direction="row" spacing={2} sx={{ m: 2 }}>
                            <h1 style={{ padding: 0, margin: '5px' }}>{key}</h1>
                            <FormControl sx={{ minWidth: 120, m: 3 }} size="small">
                                <InputLabel id="demo-simple-select-label">Сортировать</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Сортировать"
                                    onChange={(event) => handleChange(event, key)}
                                >
                                    <MenuItem value={1}>Сортировать</MenuItem>
                                    <MenuItem value={2}>Цена min</MenuItem>
                                    <MenuItem value={3}>Цена max</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Carousel cardLength={260} cardHeight={290} widthContainer={window.innerWidth * 0.98}>
                            {
                                props.product[key].map((product, index) => (
                                    <ProductCard
                                        categories={props.product}
                                        DeleteProduct={props.DeleteProduct}
                                        EditProduct={props.EditProduct}
                                        key={index}
                                        product={product}
                                        index={index}
                                    />
                                ))
                            }
                        </Carousel>
                    </div>
                ))



            }
        </div>
    );
}