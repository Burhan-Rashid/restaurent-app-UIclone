import React from 'react'
import './Restaurent.css'
import { AiFillStar } from 'react-icons/ai'

function Restaurent({ image, title, tags, rating, eta, price, discount }) {
    return (
        <div className="restaurent">
            <div className="restaurent__top__div">
                <img className="restaurent__img" src={image} alt="..." />
                <h3> {title} </h3>
                <p>{tags}</p>
            </div>
            <div className="restaurent__mid__div">
                <div className="rating">
                    <AiFillStar color="white" />
                    <h5>{rating}</h5>
                </div>
                <h5>{eta} minutes</h5>
                <h5>Rs {price} per person</h5>
            </div>
            <div className="restaurent__bottom__div">
                <h4>{discount}</h4>
            </div>
        </div>
    )
}

export default Restaurent
