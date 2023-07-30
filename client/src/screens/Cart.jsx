import React from 'react'
import { useCart, useDispatchCart } from '../components';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='my-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    const handleCheckout = async () => {
        let userEmail = localStorage.getItem('userEmail');
        let response = await fetch(`${import.meta.env.VITE_SERVER}/api/orderdata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toDateString()
            })
        })
        if (response.status == 200) {
            dispatch({ type: "DROP" })
        }
    }
    return (
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
            <table className="table">
                <thead className="text-success fs-4">
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr key={index} className='text-white text-capitalize'>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td className=''>{food.size}</td>
                            <td>{food.price}</td>
                            <td>
                                <button type="button" className="btn bg-danger p-e-2" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                <button className="btn bg-success mt-3 text-white" onClick={handleCheckout}>Check Out</button>
            </div>
        </div>
    )
}
