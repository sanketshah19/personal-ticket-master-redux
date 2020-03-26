const employeesInitialState = []

const employeesReducer = (state = employeesInitialState, action) => {
    switch(action.type){
        default: {
            return [...state]
        }
    }
}

export default employeesReducer