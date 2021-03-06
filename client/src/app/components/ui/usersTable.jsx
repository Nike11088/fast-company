import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import Profession from './profession'
import { Link } from 'react-router-dom'

const UserTable = ({ users, onSort, selectedSort, onToogleBookMark }) => {
    const columns = {
        name: {
            name: 'Имя',
            component: (user) => (
                <Link key={user._id} to={`users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: 'Качества',
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToogleBookMark(user._id)}
                />
            )
        }
    }
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    )
}

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToogleBookMark: PropTypes.func.isRequired
}

export default UserTable
