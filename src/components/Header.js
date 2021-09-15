import React from 'react'
import "./Header.css"
import { AiOutlineSearch } from "react-icons/ai"

function Header() {
    const [search, setSearch] = React.useState("");
    const [sort, setSort] = React.useState("rating");

    const handleSort = (e) => {
        setSort(e.target.value);
    }

    return (
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
    )
}

export default Header
