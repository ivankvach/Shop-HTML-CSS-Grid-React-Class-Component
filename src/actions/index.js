export const increment = () => {
    return {
        type: 'COUNT_ITEM_INCREASE'
    };
};

export const setItemS = (data) => {
    return {
        type: 'SET_ITEMS',
        payload: data
    };
};

export const setSize = (data) => {
    return {
        type: 'SET_SIZE',
        payload: data
    }
}

export const setColor = (data) => {
    return {
        type: 'SET_COLOR',
        payload: data
    }
}

export const deleteItemS = (data) => {
    return {
        type: 'DELETE_ITEMS',
        payload: data
    };
};

export const setCurrencY = (data) => {
    return {
        type: 'SET_CURRENCY',
        payload: data
    };
};

export const turnCurrency = (data) => {
    return {
        type: 'TURN_CURRENCY',
        payload: data
    };
};

export const turnCart = () => {
    return {
        type: 'TURN_CART'
    };
};