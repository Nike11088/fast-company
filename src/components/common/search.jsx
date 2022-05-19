import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ onStartSearch, placeholder }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleChangeValue = (e) => {
        console.log(e.target.value)
        setSearchValue(e.target.value)
    }

    const handleStartSearch = () => {
        console.log(searchValue)
        onStartSearch(searchValue)
        setSearchValue('')
    }

    return (
        <div className="input-group">
            <input
                type="search"
                className="form-control"
                placeholder={placeholder}
                onChange={handleChangeValue}
                value={searchValue}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleStartSearch}
            >
                <i className="bi bi-search"></i>
            </button>
        </div>
    )
}

Search.propTypes = {
    onStartSearch: PropTypes.func,
    placeholder: PropTypes.string
}

export default Search
