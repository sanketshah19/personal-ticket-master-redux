const customersInitialState = []

const customersReducer = (state = customersInitialState, action) => {
    switch(action.type){
        default: {
            return [...state]
        }
    }
}

export default customersReducer