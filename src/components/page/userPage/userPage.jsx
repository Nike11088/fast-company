import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import PropTypes from 'prop-types'

const UserPage = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => api.users.getById(userId).then((user) => setUser(user)), [])

    const handleSave = () => {
        history.push('/users')
    }

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h3>Профессия: {user.profession.name}</h3>
                <Qualities qualities={user.qualities} />
                <div>Встретился, раз: {user.completedMeetings}</div>
                <h3>Оценка: {user.rate}</h3>
                <button onClick={() => handleSave()}>Все пользователи</button>
            </>
        )
    }

    return 'Loading...'
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
