import React, { useEffect } from 'react'
import Restaurent from './card/Restaurent'
import "./Main.css"
import { Items, filters } from "../api/Apis"
import "./Header.css"
import { AiOutlineSearch } from "react-icons/ai"
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        padding: "50px",

    },
};

const PAGE_SIZE = 8;

function Main() {

    const [data, setData] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [sort, setSort] = React.useState("rating");
    const [filter, setFilter] = React.useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [numberOfPages, setNumberOfPages] = React.useState([1]);
    const [currentPage, setCurrentPage] = React.useState(1);

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
        let pages = Math.ceil(Items.length / PAGE_SIZE);
        setNumberOfPages(Array.from(new Array(pages), (x, i) => i + 1));
        //localStorage.setItem('items', JSON.stringify(Items));
        setData(Items.slice(0, PAGE_SIZE).sort(dynamicsort("rating", "desc")));
    }, []);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleCheckboxChange = (e, item) => {
        let tempFilter = [...filter];
        let index = filter.indexOf(item);
        index === -1 ? tempFilter.push(item) : tempFilter.splice(index, 1);
        setFilter(tempFilter);
    }
    const handleApplyFilter = () => {
        if (filter.length > 0) {
            let newData = data.filter(({ tags }) => {
                let itemPresent = tags.some(item => filter.includes(item))
                return itemPresent
            })
            setData(newData.sort(dynamicsort("rating", "desc")));
        } else {
            setData(Items.sort(dynamicsort("rating", "desc")));
        }
        closeModal();
    }
    const handleCancelFilter = () => {
        setFilter([]);
        setData(Items.sort(dynamicsort("rating", "desc")));
        closeModal();
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            setData(Items.slice(0, PAGE_SIZE).sort(dynamicsort("rating", "desc")));
            return;
        }
        let tempArr = Items.filter((item) => {
            return item.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setData(tempArr);
        //setData(tempArr.slice((currentPage - 1) * PAGE_SIZE, Math.min(Items.length, currentPage * PAGE_SIZE)).sort(dynamicsort("rating", "desc")));
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber === 1) {
            setCurrentPage(pageNumber);
            setData(Items.slice(0, PAGE_SIZE).sort(dynamicsort("rating", "desc")));
        } else {
            setCurrentPage(pageNumber);
            setData(Items.slice((pageNumber - 1) * PAGE_SIZE, Math.min(Items.length, pageNumber * PAGE_SIZE)).sort(dynamicsort("rating", "desc")));
        }
    }

    return (
        <>
            <div className="header">
                <div className="search__div">
                    <AiOutlineSearch size={28} color="gray" />
                    <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
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
                        <button className="filter" onClick={openModal}>Filter</button>
                    </div>
                </div>
            </div>
            <div className="main">
                {data.length > 0 ? data.map((item) => {
                    return <Restaurent key={item.title} tags={item.tags} title={item.title} image={item.image} eta={item.eta} price={item.price} discount={item.discount} rating={item.rating} />
                }) : <p>No Results Found!</p>}
            </div>
            <div className="pagination">
                <span>Go To Page :</span>
                {data.length > 0 && numberOfPages.map((i) => {
                    return <button className={currentPage === i && "button__color"} onClick={() => handlePageChange(i)}>{i}</button>
                })}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
            >
                <div className="modal">
                    <div className="modal__checkbox">
                        {filters.map((item) => {
                            return <div className="modal__filter__container"><label><input type="checkbox" onChange={(e) => handleCheckboxChange(e, item)} checked={filter.indexOf(item) === -1 ? false : true} />{item}</label></div>
                        })}
                    </div>
                    <div className="modal__buttons">
                        <button onClick={handleApplyFilter}>Apply Filter</button>
                        <button onClick={handleCancelFilter}>Cancel All Filters</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Main
