import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, setNotification, removeNotification }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value

        if (!content) {
            return
        }

        createAnecdote(content)

        e.target.anecdote.value = ''

        notify(`new anecdote '${content}' created!`)
    }

    const notify = (notification) => {
        setNotification(notification)
        setTimeout(removeNotification, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    removeNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
