import counterReducer from './counter';
import itemsReducer from './itemS';
import currencyReducer from './currency';
import turncartReducer from './turnCart';
import turncurrencyReducer from './turnCurrency';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    counter: counterReducer,
    itemS: itemsReducer,
    currency: currencyReducer,
    turnCart: turncartReducer,
    turnCurrency: turncurrencyReducer
});

export default allReducers;