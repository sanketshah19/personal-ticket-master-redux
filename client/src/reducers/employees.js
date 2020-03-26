const employeesInitialState = []

const employeesReducer = (state = employeesInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_EMPLOYEES': {
            return [...action.payload]
        }
        case 'ADD_EMPLOYEE': {
            return [...state, action.payload]
        }
        case 'EDIT_EMPLOYEE': {
            return [...state].map(emp => {
                if(emp._id === action.payload._id){
                    return Object.assign(emp, action.payload)
                }
                return emp
            })
        }
        case 'REMOVE_EMPLOYEE': {
            return [...state].filter(emp => emp._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}

export default employeesReducer