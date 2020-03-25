const ticketsInitialState = []

const assoTicketReducer = (state = ticketsInitialState, action) => {
    switch(action.type){
        case 'ASSO_TICKETS': {
            return [...action.payload]
        }
        default: {
            return [...state]
        }
    }
}

export default assoTicketReducer