import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userService from '../services/user.service'
import { useHistory } from 'react-router-dom'
import localStorageService, {
    setTokens
} from '../services/localStorage.service'
import getRandomInt from '../utils/getRandomInt'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    async function signUp({ email, password, ...rest }) {
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

        try {
            const { data } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: getRandomInt(1, 5),
                completedMeetings: getRandomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error

            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует'
                    }
                    throw errorObject
                }
            }
        }
    }
    async function logIn({ email, password }) {
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

        try {
            const { data } = await httpAuth.post(
                'accounts:signInWithPassword',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            setTokens(data)
            await getUserData()
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error

            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Пользователь с таким Email не найден'
                    }
                    throw errorObject
                }
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Неверный пароль'
                    }
                    throw errorObject
                }
            }
        }
    }
    function logOut() {
        localStorageService.removeAuthData()
        setUser(null)
        history.push('/')
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    async function updateUserData(data) {
        try {
            const { content } = await userService.update(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return (
        <AuthContext.Provider
            value={{ signUp, logIn, currentUser, logOut, updateUserData }}
        >
            {!isLoading ? children : 'Loading...'}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
