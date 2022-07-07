import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ color, name }) => {
    return <span className={`badge bg-${color} me-1`}>{name}</span>
}

Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string
}

export default Quality
