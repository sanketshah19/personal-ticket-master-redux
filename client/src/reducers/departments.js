const departmentsInitialState = []

const departmentsReducer = (state = departmentsInitialState, action) => {
    switch(action.type){
        default: {
            return [...state]
        }
    }
}

export default departmentsReducer