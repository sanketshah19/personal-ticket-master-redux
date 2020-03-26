const employeesInitialState = []

const employeesReducer = (state = employeesInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_EMPLOYEES': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default employeesReducer