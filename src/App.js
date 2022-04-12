import React, { useState, useEffect } from 'react'
import Users from './components/users'
import api from './api'

const App = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }

    const handleToogleBookMark = (id) => {
        const user = users.find((user) => user._id === id)
        if (user) {
            user.bookmark = !user.bookmark
            const updatedUsers = [...users]
            setUsers(updatedUsers)
        }
    }

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToogleBookMark={handleToogleBookMark}
                />
            )}
        </>
    )
}

export default App
