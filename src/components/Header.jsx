import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MiniCart, CurrencyOptions } from '../components';
import getSymbolFromCurrency from 'currency-symbol-map';
import {turnCart, turnCurrency} from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.turnCr = props.turnCr.bind();
    this.turnCrr = props.turnCrr.bind();
    // this.handleCurrency = this.handleCurrency.bind(this);
    // this.handleCart = this.handleCart.bind(this);
    this.state = {
      itemS: [],
      currencY: "",
      currency: false,
      cart: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      itemS: props.itemS,
      currencY: props.currency,
      currency: props.turnCurrency,
      cart: props.turnCart
    };
  }
  

  // handleCurrency() {
  //   if (this.state.currency === false) {
  //     this.setState({ currency: true })
  //   } else {
  //     this.setState({ currency: false })
  //   }
  // }
  // handleCart() {
  //   if (this.state.cart === false) {
  //     this.setState({ cart: true })
  //   } else {
  //     this.setState({ cart: false })
  //   }
  // }

  render() {

    var itemS = this.props.itemS;
    console.log(itemS);
    console.log(this.itemS);
    localStorage.setItem("cart", JSON.stringify(itemS))
    console.log(this.props.turnCart)

    return (
      <>
        <div className="wrapper">
          <div className="box1_header">
            <Link to="/" className="box1_header_women">WOMEN</Link>
            <Link to="/" className="box1_header_men">MEN</Link>
            <Link to="/" className="box1_header_kids">KIDS</Link>
          </div>
          <Link to="/" className="box2_header"><img src={require('../images/' + 'logo' + '.png')} alt="1" /></Link>
          <div className="box3_header">
            <div className="box3_header_currency" onClick={() => this.turnCrr()}>
              <div>{getSymbolFromCurrency(this.state.currencY.slice(0, 3))}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg>
            </div>
            <div className="box3_header_cart" onClick={() => this.turnCr()}>
              {this.state.itemS.length ?
                <div className="box3_header_cart_count">
                  {this.state.itemS.length}
                </div> : " "
              }
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </div>
          </div>
          {this.state.currency ? <CurrencyOptions /> : " "}
          {this.state.cart ? <MiniCart /> : " "}
        </div>
        {this.state.cart ? <div className="cover" onClick={() => this.turnCr()}></div> : " "}
        {this.state.currency ? <div className="cover" onClick={() => this.turnCrr()}></div> : " "}
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
      turnCr: () => {
          dispatch(turnCart());
          console.log()
      },
      turnCrr: () => {
          dispatch(turnCurrency())
          console.log("i am clicked")
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);