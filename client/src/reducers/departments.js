const departmentsInitialState = []

const departmentsReducer = (state = departmentsInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_DEPARTMENTS': {
            return [...action.payload]
        }
        case 'ADD_DEPARTMENT': {
            return [...state, action.payload]
        }
        case 'REMOVE_DEPARTMENT': {
            return [...state].filter(dept => dept._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}

export default departmentsReducer