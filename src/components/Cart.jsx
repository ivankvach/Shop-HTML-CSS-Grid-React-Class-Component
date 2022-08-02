import React from 'react'
import { setItemS, deleteItemS, setSize, setColor, increment } from '../actions';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map';
import { connect } from 'react-redux';
import products from '../data';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.products = products;
        this.itemS = props.itemS;
        this.sendOrder = props.sendOrder.bind();
        this.sendToCart = props.sendToCart.bind();
        this.deleteToCart = props.deleteToCart.bind();
        this.addColor = props.addColor.bind();
        this.addSize = props.addSize.bind();
        this.handleIncrement = props.handleIncrement.bind();

        this.tick = this.tick.bind(this);
        this.state = {
            itemid: 0,
            itemS: [],
            charge: 0,
            items1: [],
            emptyCart: true,
            price: 0,
            orderr: false,
            loading: true
        };
    }
    static getDerivedStateFromProps(props, state) {
        return { itemS: props.itemS };
    }

    componentDidMount() {
        this.tick()
    }

    tick() {

        if (localStorage.getItem("cart") === "[]") {
            this.setState({ items: localStorage.getItem("cart") })
            this.setState({ emptyCart: false })

        } else {
            this.setState({ items: JSON.parse(localStorage.getItem("cart")) })
            this.setState({ emptyCart: true })
        }
        if (this.state.emptyCart === true) {
            //Array of titles

            const titleTitle = this.state.itemS.map((item) => {
                return item.title
            })
            console.log(titleTitle)

            //Array of filtered titles

            const filtered = titleTitle.filter((item, index) => {

                return titleTitle.indexOf(item) === index;

            });
            console.log(filtered)

            //Array of indexes of filtered titles

            let finalFiltered = [];
            for (let i = 0; i < this.state.itemS.length; i++) {
                finalFiltered.push(this.state.itemS.findIndex((item) => item.title === filtered[i]))
            }

            //Array of indexes ( !==-1 ) of filtered titles

            const finalFiltered1 = finalFiltered.filter((item) => item !== -1)
            console.log(finalFiltered1)

            //Final Array of objects

            let finalFinal = [];
            finalFiltered1.map((item) => {
                finalFinal.push(this.state.itemS[item])
            })
            const pricePrice = this.state.itemS.map((price) => {
                return price.price
            })


            console.log(pricePrice)
            const total = pricePrice.reduce((a, b) => a + b, 0)
            this.setState({ price: total })



            console.log(finalFinal)
            console.log("yes i am rerender")
            return this.setState({ items1: finalFinal })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.itemS !== this.state.itemS) {
            console.log(prevState.itemS)
            console.log(this.state.itemS)
            this.tick();
        }
    }

    render() {

        var itemS = this.props.itemS;
        let currency = this.props.currency;
        console.log(itemS);
        console.log(this.itemS);
        localStorage.setItem("cart", JSON.stringify(itemS))
        console.log(this.state.items1)

        return (
            <div className="wrapper_cart">
                <form action='/cart'>
                    <h1>Cart</h1>
                    {this.state.emptyCart ?
                        <div className="cart_section">
                            {this.state.items1.map((item, index) =>
                                <div className="cart_section_single_product_1">
                                    <div className="cart_section_single_product_1_options">
                                        <h1>{item.title}</h1>
                                        <h2>{item.title}</h2>
                                        <h3>{getSymbolFromCurrency(currency.slice(0, 3))}{(parseFloat(currency.slice(3)).toFixed(2) * item.price).toFixed(2)}</h3>
                                        <h4>SIZE:</h4>
                                        <select name="size" className="cart_section_single_product_1_options_size_select" size="8" onClick={(e) => this.addSize(item, e)} required>
                                            {item.allsize.map((size) => <option className="cart_section_single_product_1_options_size_xs" style={ size === item.size ? {  backgroundColor: "black", color: "white"} : {  backgroundColor: "white", color: "black"}} value={size}>{size}</option>)}
                                        </select>
                                        <h4>COLOR:</h4>
                                        <select name="color" className="cart_section_single_product_1_options_color_select" size="8" tabIndex="-1" onClick={(e) => this.addColor(item, e)} required>
                                            {item.allcolor.map((color) => <option className="cart_section_single_product_1_options_color_grey" tabIndex="0" onClick={(e) => e.target.style.boxShadow = `0 0 10px 100px ${color} inset`} style={ color === item.color ? { width: "35px", height: "35px", border: "2px solid grey", backgroundColor: color, color: color } : { backgroundColor: color, color: color }} value={color}></option>)}
                                        </select>
                                    </div>
                                    <div className="cart_section_single_product_1_options_photo">
                                        <div className="cart_section_single_product_1_options_photo_mount">
                                            <div className="cart_section_single_product_1_options_photo_mount_plus"><span className="cart_section_single_product_1_options_photo_mount_plus" onClick={() => this.sendToCart(item)}>+</span></div>
                                            <div className="cart_section_single_product_1_options_photo_mount_count">{itemS.filter((itemm) => itemm.title === item.title).length}</div>
                                            <div className="cart_section_single_product_1_options_photo_mount_minus"><span className="cart_section_single_product_1_options_photo_mount_minus" onClick={() => this.deleteToCart(item)}>-</span></div>
                                        </div>
                                        <div className="cart_section_single_product_1_options_photo_photo" onClick={() => this.setState({ itemid: item.id })}><Link to={`/single-product/${item.id}`}><img src={require('../images/' + item.photo + '.png')} alt="1" /></Link></div>
                                    </div>
                                </div>
                            )}
                            <div className="cart_section_order_send">
                                <div className="cart_section_order_send_left_section">
                                    <h2>Tax 21%: {getSymbolFromCurrency(currency.slice(0, 3))}{(((parseFloat(currency.slice(3)).toFixed(2) * this.state.price).toFixed(2)) * 0.21).toFixed(2)}</h2>
                                    <h2>Quanity: {itemS.length}</h2>
                                    <h2>Total: {getSymbolFromCurrency(currency.slice(0, 3))}{(parseFloat(currency.slice(3)).toFixed(2) * this.state.price).toFixed(2)}</h2>
                                    <div className="cart_section_order_send_button">
                                        <button type="submit" onClick={() => this.sendOrder()}>Order</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="cart_section"><h2>Your cart is empty</h2></div>}
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log(state)
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        handleIncrement: () => {
            dispatch(increment());
        },
        sendToCart: (item) => {
            dispatch(setItemS({ ...item, "time": Date.now() }))
            console.log(item)
        },

        deleteToCart: (item, index) => {
            dispatch(deleteItemS(item))
            console.log(item)
        },

        addSize: (item, e) => {
            const itemSize = { ...item, "size": e.target.value }
            console.log(itemSize)
            dispatch(setSize(itemSize))
        },

        addColor: (item, e) => {
            const itemColor = { ...item, "color": e.target.value }
            console.log(itemColor)
            dispatch(setColor(itemColor))
        },

        sendOrder: () => {
            localStorage.removeItem("cart")
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);