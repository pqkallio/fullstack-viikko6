import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { setNotification, removeNotification } from './reducers/notificationReducer'

class App extends React.Component {
    onNotification = (notification) => {
        const store = this.props.store
        store.dispatch(setNotification(notification))
        setTimeout(() => {
            store.dispatch(removeNotification())
        }, 5000)
    }

    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification store={this.props.store} />
                <AnecdoteList store={this.props.store} handleNotification={this.onNotification} />
                <AnecdoteForm store={this.props.store} handleNotification={this.onNotification} />
            </div>
        )
    }
}

export default App