
let initialState = "";
if (localStorage.getItem("cart") === "" || localStorage.getItem("cart") === null) {
    initialState = [];
    localStorage.setItem("cart", "[]")
} else {
    initialState = JSON.parse(localStorage.getItem("cart"))
}
const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            if (localStorage.getItem("cart") === "") {
                state = localStorage.getItem("cart")
            } else {
                state = JSON.parse(localStorage.getItem("cart"))

            }
            return [
                ...state,
                action.payload
            ]


        case 'DELETE_ITEMS':
            if (localStorage.getItem("cart") === "") {
                state = localStorage.getItem("cart")
            } else {
                state = JSON.parse(localStorage.getItem("cart"))
            }
            return [
                ...state.filter((card) => card.time !== action.payload.time)
            ]

        case 'SET_SIZE':
            if (localStorage.getItem("cart") === "") {
                state = localStorage.getItem("cart")
            } else {
                state = JSON.parse(localStorage.getItem("cart"))
            }
            return [
                ...state.map((item) => item.title !== action.payload.title ? item : action.payload)
            ]

        case 'SET_COLOR':
            if (localStorage.getItem("cart") === "") {
                state = localStorage.getItem("cart")
            } else {
                state = JSON.parse(localStorage.getItem("cart"))
            }
            return [
                ...state.map((item) => item.title !== action.payload.title ? item : action.payload)
            ]

        default: return state;
    }
}

export default itemsReducer;