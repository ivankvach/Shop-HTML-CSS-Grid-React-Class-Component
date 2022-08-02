import React from 'react';
import products from '../data';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.products = products;
  }

  render() {

    let currency = this.props.currency;
    console.log(this.props.currency);

    return (
      <div className="wrapper_products">
        <div className="products_category"><h1>Category name</h1></div>
        <div className="products_list">
          {this.products.map((item) =>
            <div className="product_list_sigle">
              <div className="product_list_sigle_image">
                <Link to={`single-product/${item.id}`}><img src={require('../images/' + item.photo + '.png')} alt="1" /></Link>
              </div>
              <div className="product_list_sigle_descriptions">
              <Link to={`single-product/${item.id}`}><h2 className="product_list_sigle_descriptions_title">{item.title}{this.state.query}</h2></Link>
              <Link to={`single-product/${item.id}`}><h2 className="product_list_sigle_descriptions_price">{getSymbolFromCurrency(currency.slice(0, 3))} {(parseFloat(currency.slice(3)).toFixed(2) * item.price).toFixed(2)}</h2></Link>
              </div>
            </div>
          )}
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return state;
};

export default connect(mapStateToProps)(Products);
