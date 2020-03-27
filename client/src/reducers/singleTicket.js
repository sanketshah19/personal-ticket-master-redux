const ticketInitialState = {}

const singleTicketReducer = (state = ticketInitialState, action) => {
    switch(action.type){
        case 'SINGLE_TICKET': {
            return {...action.payload}
        }
        default: {
            return {...state}
        }
    }
}

export default singleTicketReducer