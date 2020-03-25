const customersInitialState = []

const customersReducer = (state = customersInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_CUSTOMERS': {
            return [...action.payload]
        }
        case 'ADD_CUSTOMER': {
            return [...state, action.payload]
        }
        case 'EDIT_CUSTOMER': {
            return [...state].map(customer=> {
                if(action.payload._id === customer._id){
                    return Object.assign(customer, action.payload)
                }
                return customer
            })
        }
        default: {
            return [...state]
        }
    }
}

export default customersReducer