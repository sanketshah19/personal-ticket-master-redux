const customerInitialState = {}

const singleCustomerReducer = (state = customerInitialState, action) => {
    switch(action.type){
        case 'SINGLE_CUSTOMER': {
            return {...action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default singleCustomerReducer