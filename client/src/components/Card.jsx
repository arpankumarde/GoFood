import React from 'react'

export default function Card(props) {
    let options = props.options;
    let priceOptions = Object.keys(options);

    const handleAddtocart = () => {

    }

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.image} className="card-img-top" alt={props.foodName} style={{ height: '130px', objectFit: 'cover' }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <div className="container w-100">
                            <select name="" id="" className="m-2 h-100 bg-success rounded">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select name="" id="" className="m-2 h-100 bg-success rounded">
                                {priceOptions.map((data, key) => {
                                    return <option key={key} value={data}>{data}</option>
                                })}
                            </select>
                            <div className="d-inline h-100 fs-5">Total price</div>
                        </div>
                        <hr />
                        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddtocart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
