import React, { useCallback } from 'react'
import Carousel from './../Сarousel/Сarousel'
import ProductCard from './ProductCard/ProductCard'
import CategoryHeader from './CategoryHeader/CategoryHeader'

export default function CategoriesProduct(props) {
    return (
        <div>
            {
                Object.keys(props.product).map((key) => (
                    <div key={key} style={{ marginTop: '20px' }}>
                        <CategoryHeader
                            title={key}
                            Sorting={props.Sorting}
                        />
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