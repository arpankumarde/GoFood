import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '../components'

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});
    const fetchMyOrder = async () => {
        await fetch(`${import.meta.env.VITE_SERVER}/api/myorderdata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response)
            setOrderData(response);
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    let Order_date;
    return (
        <>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <>
                                                    {arrayData.Order_date ?
                                                        <div className='m-auto mt-4'>
                                                            {Order_date = arrayData.Order_date}
                                                            <hr />
                                                        </div>
                                                        :
                                                        <div className='col-12 col-md-6 col-lg-4'>
                                                            <div className="card mt-2" style={{ width: "18rem", maxHeight: "360px" }}>
                                                                {/* <img src={arrayData.img} className="card-img-top" alt={arrayData.name} style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='w-100' style={{ height: "40px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        {/* <span className='m-1'>{Order_date}</span> */}
                                                                    </div>
                                                                    <div className='fs-5'>
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            )
                                        })
                                    )
                                }) : null
                        )
                    }) : null}
                </div>
            </div>

            <Footer />
        </>
    )
}
