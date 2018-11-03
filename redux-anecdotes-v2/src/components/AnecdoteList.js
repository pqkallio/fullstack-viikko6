import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
    onVote = (anecdote) => () => {
        const store = this.props.store
        store.dispatch(voteAnecdote(anecdote.id))
        this.props.handleNotification(`you voted '${anecdote.content}'`)
    }

    anecdotesToShow = () => {
        const { anecdotes, filter } = this.props.store.getState()

        return anecdotes
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    }

    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter store={this.props.store} />
                {this.anecdotesToShow().map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={this.onVote(anecdote)}>
                                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default AnecdoteList
