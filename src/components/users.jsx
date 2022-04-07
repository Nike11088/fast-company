import React from 'react'
import User from './user'
import { generateKey } from '../util'

const Users = ({ users, onDelete, onToogleBookMark }) => {
  return (
    <>
      {users.length > 0 && (
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
            {users.map((user) => (
              <User key={generateKey(user._id)} {...user} onDelete={onDelete} onToogleBookMark={onToogleBookMark} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
