import React from 'react';
import { connect } from 'react-redux';
import { setCurrencY,turnCurrency } from '../actions'
import getSymbolFromCurrency from 'currency-symbol-map';

class CurrencyOptions extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrency = props.setCurrency.bind();
  }

  render() {

    return (
      <div className="wrapper_currency_options">
        <option className="wrapper_currency_options_usd" onClick={(e) => this.setCurrency(e)} value="usd1">{getSymbolFromCurrency("usd")}  USD</option>
        <option className="wrapper_currency_options_eur" onClick={(e) => this.setCurrency(e)} value="eur1.12">{getSymbolFromCurrency("eur")}  EUR</option>
        <option className="wrapper_currency_options_jpy" onClick={(e) => this.setCurrency(e)} value="jpy139.23">{getSymbolFromCurrency("jpy")}  JPY</option>
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
    setCurrency: (e) => {
      dispatch(setCurrencY(e.target.value));
      dispatch(turnCurrency())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOptions);
