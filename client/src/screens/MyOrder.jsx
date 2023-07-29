import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrder() {
    const [orderData, setOrderData] = useState('');
    const fetchMyOrder = async () => {
        await fetch('http://localhost:3000/api/myorderdata', {
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
            <div>
                <Navbar />
            </div>

            <div>
                <div className='container'>
                    <div className='row'>
                        {orderData !== {} ? Array(orderData).map(data => {
                            return (
                                data.orderData ?
                                    data.orderData.order_data.slice(0).reverse().map((item) => {
                                        return (
                                            item.map((arrayData, key) => {
                                                return (
                                                    <div key={key}>
                                                        {arrayData.Order_date ?
                                                            <div className='m-auto mt-5'>
                                                                {Order_date = arrayData.Order_date}
                                                                <hr />
                                                            </div>
                                                            :
                                                            <div className='col-12 col-md-6 col-lg-3' >
                                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                    {/* <img src={arrayData.img} className="card-img-top" alt={arrayData.name} style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                            <span className='m-1'>{arrayData.qty}</span>
                                                                            <span className='m-1'>{arrayData.size}</span>
                                                                            <span className='m-1'>{Order_date}</span>
                                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                                ₹{arrayData.price}/-
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                    }) : null
                            )
                        }) : null}
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}
