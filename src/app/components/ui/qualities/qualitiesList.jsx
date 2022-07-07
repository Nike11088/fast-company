import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Quality from './quality'
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch()
    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = useSelector(getQualitiesByIds(qualities))
    console.log(qualitiesList)
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    if (isLoading) return 'Loading...'

    return (
        <>
            {qualitiesList.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
