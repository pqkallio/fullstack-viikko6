import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, notify }) => {
    const handleSubmit = async (e) => {
        e.preventDefault()

        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        if (!content) {
            return
        }

        createAnecdote(content)

        notify(`new anecdote '${content}' created!`, 5000)
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
    notify
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
