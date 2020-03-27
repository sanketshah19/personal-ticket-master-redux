const ticketsInitialState = [] 

const ticketsReducer = (state = ticketsInitialState, action) => {
    switch(action.type){
        default: {
            return [...state]
        }
    }
}

export default ticketsReducer