const customersInitialState = []

const customersReducer = (state = customersInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_CUSTOMERS': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default customersReducer