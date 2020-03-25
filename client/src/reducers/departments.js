const departmentsInitialState = []

const departmentsReducer = (state = departmentsInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_DEPARTMENTS': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default departmentsReducer