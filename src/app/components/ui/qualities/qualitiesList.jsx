import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities()

    if (!isLoading) {
        return (
            <>
                {qualities.map((qualityId) => (
                    <Quality key={qualityId} id={qualityId} />
                ))}
            </>
        )
    } else {
        return 'Loading...'
    }
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList