const ticketsInitialState = [] 

const ticketsReducer = (state = ticketsInitialState, action) => {
    switch(action.type){
        case 'GET_ALL_TICKETS': {
            return [...action.payload]
        }
        case 'ALL': {
            return [...action.payload]
        }
        case 'HIGH': {
            return [...action.payload].filter(ticket => ticket.priority === "High")
        }
        case 'MEDIUM': {
            return [...action.payload].filter(ticket => ticket.priority === "Medium")
        }
        case 'LOW': {
            return [...action.payload].filter(ticket => ticket.priority === "Low")
        }
        case 'CODE': {
            return [...action.payload.dupTickets].filter(ticket => ticket.code.toLowerCase().includes(action.payload.code.toLowerCase()))
        }
        case 'ADD_TICKET': {
            return [...state, action.payload]
        }
        case 'EDIT_TICKET': {
            return [...state].map(ticket => {
                if(ticket._id === action.payload._id){
                    return Object.assign(ticket, action.payload)
                }
                return ticket
            })
        }
        default: {
            return [...state]
        }
    }
}

export default ticketsReducer