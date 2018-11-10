import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE_ANECDOTE',
            anecdote: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            anecdotes
        })
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.vote(anecdote)
        dispatch({
            type: 'VOTE_ANECDOTE',
            anecdote
        })
    }
}

const reducer = (store = [], action) => {
    let anecdotes = store

    switch (action.type) {
        case 'VOTE_ANECDOTE':
            anecdotes = anecdotes.map(a => a.id !== action.anecdote.id ? a : { ...a, votes: a.votes + 1 })
            return anecdotes
        case 'CREATE_ANECDOTE':
            return [
                ...anecdotes,
                action.anecdote
            ]
        case 'INIT_ANECDOTES':
            return action.anecdotes
        default:
            return store
    }
}

export default reducer