
const turncartReducer = (state = false, action) => {
    switch (action.type) {
        case 'TURN_CART':
            if (state === false) {
                return state = true;
            } else {
                return state = false;
            }
        default: return state;
    }
}

export default turncartReducer;