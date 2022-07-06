import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import UsersListPage from '../components/page/usersListPage'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
    const params = useParams()
    const { currentUser } = useAuth()
    const { userId, edit } = params
    const history = useHistory()

    useEffect(async () => {
        if (edit && currentUser._id !== userId) {
            history.replace(`/users/${currentUser._id}/edit`)
            return null
        }
    }, [])

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    )
}

export default Users
