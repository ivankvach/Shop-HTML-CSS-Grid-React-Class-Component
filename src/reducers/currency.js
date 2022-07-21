
const currencyReducer = (state = "usd1", action) => {
    switch (action.type) {
        case 'SET_CURRENCY':
            return state = action.payload;
        default: return state;
    }
}

export default currencyReducer;