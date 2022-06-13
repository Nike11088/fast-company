import React from 'react'
import { useQualities } from '../../../hooks/useQualities'
import PropTypes from 'prop-types'

const Quality = ({ id }) => {
    const { getQuality } = useQualities()
    const quality = getQuality(id)

    return (
        <span key={quality._id} className={`badge bg-${quality.color} me-1`}>
            {quality.name}
        </span>
    )
}

Quality.propTypes = {
    id: PropTypes.string.isRequired
}

export default Quality
