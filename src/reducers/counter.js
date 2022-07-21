
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'COUNT_ITEM_INCREASE':
            return state + 1;
            default: return state; 
    }
}

export default counterReducer;