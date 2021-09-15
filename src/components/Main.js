import React, { useEffect } from 'react'
import Restaurent from './card/Restaurent'
import "./Main.css"
import Items from "../api/Apis"

function Main() {

    const [data, setData] = React.useState([]);

    useEffect(() => {
        setData(Items);
        console.log(Items);
    }, [])

    return (
        <div className="main">
            {data.map((item) => {
                return <Restaurent key={item.title} tags={item.tags} title={item.title} image={item.image} eta={item.eta} price={item.price} discount={item.discount} rating={item.rating} />
            })}
        </div>
    )
}

export default Main
