
const turncurrencyReducer = (state = false, action) => {
    switch (action.type) {
        case 'TURN_CURRENCY':
            if (state === false) {
                return state = true;
            } else {
                return state = false;
            }
        default: return state;
    }
}

export default turncurrencyReducer;