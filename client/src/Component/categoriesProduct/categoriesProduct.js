import React from 'react'
import Carousel from './Сarousel/Сarousel'
import ProductCard from './ProductCard/ProductCard'


export default function CategoriesProduct(props) {

    return(
       <div>
          {
            Object.keys(props.product).map((key)=>(
                <div key={key} style={{marginTop:'25px'}}>
                    <h1 style={{padding:0,margin:'5px'}}>{key}</h1>
                    <Carousel cardLength={265} cardHeight={290}>
                        {
                            props.product[key].map((product, index)=>(
                                <ProductCard
                                    setMessage={props.setMessage}
                                    setErrors={props.setErrors}
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