import React from 'react'
import { applyFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ applyFilter }) => {
    const handleChange = (event) => {
        applyFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    applyFilter
}

export default connect(null, mapDispatchToProps)(Filter)