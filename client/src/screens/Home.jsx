import React, { useState, useEffect } from 'react'
import { Navbar, Footer, Card } from '../components'

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = async () => {
        let response = await fetch(`${import.meta.env.VITE_SERVER}/api/foodData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        // console.log(response[0], response[1]);
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <Navbar />

            <div id="carouselFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "cover !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className="btn bg-success text-white" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="Burger" style={{ filter: "brightness(30%)", objectFit: 'cover', objectPosition: 'bottom' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?ice-cream" className="d-block w-100" alt="Ice Cream" style={{ filter: "brightness(30%)", objectFit: 'cover', objectPosition: 'bottom' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?paneer" className="d-block w-100" alt="Paneer" style={{ filter: "brightness(30%)", objectFit: 'cover', objectPosition: 'bottom' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?fried-rice" className="d-block w-100" alt="Fried Rice" style={{ filter: "brightness(30%)", objectFit: 'cover', objectPosition: 'bottom' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className='container'>
                {
                    foodCat !== [] ? foodCat.map((data) => {
                        return (
                            <div className='row' key={data._id}>
                                <div key={data._id} className='fs-3 my-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    foodItem != [] ? foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search)))
                                        .map((filterItem) => {
                                            return (
                                                <div key={filterItem._id} className='col-12 col-md-6 col-lg-4'>
                                                    <Card foodItem={filterItem} options={filterItem.options[0]} />
                                                </div>
                                            )
                                        })
                                        : null
                                }
                            </div>
                        )
                    }) : null
                }
            </div>

            <Footer />
        </div>
    )
}
