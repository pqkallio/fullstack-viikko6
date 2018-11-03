const actions = {
    APPLY_FILTER: 'APPLY_FILTER'
}

export const applyFilter = (filter) => {
    return {
        type: actions.APPLY_FILTER,
        filter
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case actions.APPLY_FILTER:
            return action.filter
        default:
            return state
    }
}

export default filterReducer