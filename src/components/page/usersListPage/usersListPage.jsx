import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { paginate } from '../../../utils/paginate'
import api from '../../../api'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import UserPage from '../userPage/userPage'
import PropTypes from 'prop-types'
import _ from 'lodash'

const UsersListPage = () => {
    const params = useParams()

    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const [users, setUsers] = useState()

    useEffect(() => api.users.fetchAll().then((data) => setUsers(data)), [])
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const { userId } = params
    const pageSize = 8

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

    const handleProfessionSelect = (item) => {
        if (setSearchQuery !== '') setSearchQuery('')
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const handleSearchQuery = (e) => {
        setSelectedProf(undefined)
        setSearchQuery(e.target.value)
    }

    const filterUsers = () => {
        if (searchQuery) {
            return users.filter((user) =>
                user.name
                    .toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
            )
        }

        if (selectedProf) {
            return users.filter(
                (user) => user.profession._id === selectedProf._id
            )
        }

        return users
    }

    if (userId) {
        return <UserPage userId={userId} />
    } else if (users) {
        const filteredUsers = filterUsers()
        const count = filteredUsers && filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex me-3">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3 pt-1">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column w-100">
                    <SearchStatus length={count} />
                    <div className="input-group">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Поиск..."
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />
                    </div>
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToogleBookMark={handleToogleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'Loading...'
}

UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage
