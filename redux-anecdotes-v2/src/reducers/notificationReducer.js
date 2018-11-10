export const notify = (notification, timeout) => {
    return async (dispatch) => {
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(removeNotification()) }, timeout)
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer
