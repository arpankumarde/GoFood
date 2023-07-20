import React from 'react'

export default function Card() {
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src="https://picsum.photos/400/250" className="card-img-top" alt="productName" />
                    <div className="card-body">
                        <h5 className="card-title">Product Name</h5>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur.</p>
                        <div className="container w-100">
                            <select name="" id="" className="m-2 h-100 bg-success rounded">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select name="" id="" className="m-2 h-100 bg-success rounded">
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div className="d-inline h-100 fs-5">Total price</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
