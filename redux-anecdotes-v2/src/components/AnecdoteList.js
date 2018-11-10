import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'


const AnecdoteList = ({ anecdotesToShow, voteAnecdote, notify }) => {
    const onVote = (anecdote) => () => {
        voteAnecdote(anecdote)
        notify(`you voted '${anecdote.content}'`, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={onVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: state.anecdotes
            .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    }
}

const mapDispatchToState = {
    voteAnecdote,
    notify
}

export default connect(mapStateToProps, mapDispatchToState)(AnecdoteList)
