const employeeInitialState = {}

const singleEmployeeReducer = (state = employeeInitialState, action) => {
    switch(action.type){
        case 'SINGLE_EMPLOYEE': {
            return {...action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default singleEmployeeReducer