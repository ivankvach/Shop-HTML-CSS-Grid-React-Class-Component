import React from 'react';

import { useParams } from 'react-router-dom';
import products from '../data';
import { setItemS, setSize, setColor } from '../actions';
import getSymbolFromCurrency from 'currency-symbol-map';
import { connect } from 'react-redux';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.product = products;
        this.id = props.params.id;
        this.itemS = props.itemS;
        this.sendToCart = props.sendToCart.bind();
        this.addColor = props.addColor.bind();
        this.addSize = props.addSize.bind();

        this.state = {
            itemS: [],
            charge: 0,
            items1: [],
            emptyCart: true,
            price: 0,
        };
    }
    static getDerivedStateFromProps(props, state) {
        return { itemS: props.itemS };
    }

    render() {

        var itemS = this.props.itemS;
        let currency = this.props.currency;
        console.log(this.props.params);
        console.log(this.itemS);
        localStorage.setItem("cart", JSON.stringify(itemS))
        console.log(this.state.charge)
        return (
            <>
                {this.product.filter((item) => item.id === this.id).map((item) =>
                    <div className="wrapper_single_product">
                        <div className="single_product_left_section">
                            <div className="single_product_left_section_images"><img src={require('../images/' + item.photo + '.png')} alt="1" /></div>
                            <div className="single_product_left_section_images"><img src={require('../images/' + item.photo + '.png')} alt="1" /></div>
                            <div className="single_product_left_section_images"><img src={require('../images/' + item.photo + '.png')} alt="1" /></div>
                        </div>
                        <div className="single_product_center_section"><img src={require('../images/' + item.photo + '.png')} alt="1" /></div>
                        <div className="single_product_right_section">
                            <h2>{item.title}</h2>
                            <h2 className="title">{item.title}</h2>
                            <h4>SIZE:</h4>
                            <select name="size" className="cart_section_single_product_1_options_size_select" size="8" onClick={(e) => this.addSize(item, e)} required>
                                        {item.allsize.map((size) => <option className="cart_section_single_product_1_options_size_xs" value={size}>{size}</option>)}
                                        </select>   
                            <h4>COLOR:</h4>
                            <select name="color" className="cart_section_single_product_1_options_color_select" size="8" tabIndex="-1" onClick={(e) => this.addColor(item, e)} required>
                                            {item.allcolor.map((color) =><option className="cart_section_single_product_1_options_color_grey" tabIndex="0" onClick={(e) => e.target.style.boxShadow = `0 0 10px 100px ${color} inset`} style={{ backgroundColor: color, color: color }} value={color}></option> )}
                                            </select>
                            <h4>PRICE:</h4>
                            <h3 className="prise">{getSymbolFromCurrency(currency.slice(0, 3))}{(parseFloat(currency.slice(3)).toFixed(2) * item.price).toFixed(2)}</h3>
                            <div className="single_product_right_section_options_button">
                                <button onClick={() => this.sendToCart(item)}>Send to Cart</button>
                            </div>
                            <div className="single_product_right_section_options_paragraph">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam impedit hic aliquid officia sunt! Placeat repellendus quis est officiis maiores quasi eaque aut facilis mollitia. Quisquam, eos. Cumque, cum? Quod cupiditate odit excepturi exercitationem cum porro, velit est unde culpa? Fugit et laudantium, nisi temporibus corrupti minus iure unde commodi?</p>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

}

const mapStateToProps = state => {
    console.log(state)
    return state;
};

const mapDispatchToProps = dispatch => {
    return {

        sendToCart: (item) => {
            dispatch(setItemS({ ...item, "time": Date.now() }))
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withParams(SingleProduct));