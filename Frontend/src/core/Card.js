import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';


const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                </button>
                </Link>
            ));

    };


    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    };


    const showAddToCartBtn = (showAddToCartButton) => {
        return (
            showAddToCartButton && (

                < button
                    onClick={addToCart}
                    className="btn btn-warning mt-2 mb-2" >
                    Add to card
        </button >
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                < button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-danger mt-2 mb-2" >
                    Remove Product
        </button >
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge-stock badge">In Stock</span>
        ) : (
                <span className="badge-stock badge">Out of Stock</span>

            )
    };
    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        };
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={count}
                        onChange={handleChange(product._id)} />
                </div>
            )
        );
    };
    return (

        <div className="card h-100">
            <div className="card-header name">{product.name}</div>
            <div className="card-body d-flex flex-column">
                {shouldRedirect(redirect)}

                <ShowImage item={product} url="product" />
                <p className="mt-2">{product.description.substring(0, 1000)}</p>
                <div className="mt-auto">
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}
                    <br />
                    {showViewButton(showViewProductButton)}

                    {showAddToCartBtn(showAddToCartButton)}

                    {showRemoveButton(showRemoveProductButton)}

                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
        </div >
    );
};

export default Card;
