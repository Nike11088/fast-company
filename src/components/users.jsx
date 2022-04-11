import React, { useState, useEffect } from 'react'
import User from './user'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api'

const Users = ({ users: allUsers, onDelete, onToogleBookMark }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const pageSize = 4

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers
    const count = (filteredUsers && filteredUsers.length) || 0
    const userCrop = paginate(filteredUsers, currentPage, pageSize)
    const clearFilter = () => {
        setSelectedProf()
    }

    return (
        <>
            {professions && (
                <>
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
                </>
            )}

            {allUsers.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился,раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={onDelete}
                                onToogleBookMark={onToogleBookMark}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToogleBookMark: PropTypes.func.isRequired
}

export default Users
