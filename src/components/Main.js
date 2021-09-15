import React, { useEffect } from 'react'
import Restaurent from './card/Restaurent'
import "./Main.css"
import Items from "../api/Apis"
import "./Header.css"
import { AiOutlineSearch } from "react-icons/ai"

function Main() {

    const [data, setData] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [sort, setSort] = React.useState("rating");

    function dynamicsort(property, order) {
        var sort_order = 1;
        if (order === "desc") {
            sort_order = -1;
        }
        return function (a, b) {
            // a should come before b in the sorted order
            if (a[property] < b[property]) {
                return -1 * sort_order;
                // a should come after b in the sorted order
            } else if (a[property] > b[property]) {
                return 1 * sort_order;
                // a and b are the same
            } else {
                return 0 * sort_order;
            }
        }
    }
    const handleSort = (e) => {
        setSort(e.target.value);
        let newArr = [];
        if (e.target.value === "rating") {
            newArr = data.sort(dynamicsort("rating", "desc"))
        } else if (e.target.value === "eta") {
            newArr = data.sort(dynamicsort("eta", "asc"))
        } else if (e.target.value === "pricelh") {
            newArr = data.sort(dynamicsort("price", "asc"))
        } else if (e.target.value === "pricehl") {
            newArr = data.sort(dynamicsort("price", "desc"))
        }
        setData(newArr);
    }

    useEffect(() => {
        //localStorage.setItem('items', JSON.stringify(Items));
        setData(Items.sort(dynamicsort("rating", "desc")));
    }, []);

    return (
        <>
            <div className="header">
                <div className="search__div">
                    <AiOutlineSearch size={28} color="gray" />
                    <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="next__div">
                    <div className="sort">
                        <h3>Sort By: </h3>
                        <select value={sort}
                            onChange={handleSort}>
                            <option value="rating">Rating</option>
                            <option value="pricelh">Price Low to High</option>
                            <option value="pricehl">Price High to low</option>
                            <option value="eta">ETA</option>
                        </select>
                    </div>
                    <div >
                        <button className="filter">Filter</button>
                    </div>
                </div>
            </div>
            <div className="main">
                {data.map((item) => {
                    return <Restaurent key={item.title} tags={item.tags} title={item.title} image={item.image} eta={item.eta} price={item.price} discount={item.discount} rating={item.rating} />
                })}
            </div>
        </>
    )
}

export default Main
