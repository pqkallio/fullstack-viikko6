import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value

        if (!content) {
            return
        }

        const store = this.props.store
        store.dispatch(createAnecdote(content))

        e.target.anecdote.value = ''

        this.props.handleNotification(`new anecdote '${content}' created!`)
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote' /></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

export default AnecdoteForm
