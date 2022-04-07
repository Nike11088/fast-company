import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
    return (
        <i
            className={
                'bi cursor-pointer' +
                (status ? ' bi-bookmark-fill' : ' bi-bookmark')
            }
            onClick={() => rest.onToogleBookMark(rest.userId)}
        ></i>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    rest: PropTypes.array.isRequired
}

export default BookMark
