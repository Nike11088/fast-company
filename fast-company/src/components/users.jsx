import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }

  const renderPhrase = (number) => {
    const personCount = number

    if (number > 99) {
      number = String(number)
      number = number.slice(number.length - 2)
      number = Number(number)
    }

    if (15 <= number && number <= 99) {
      number = String(number)
      number = number.slice(number.length - 1)
      number = Number(number)
    }

    let word = 'человек'
    if (2 <= number && number <= 4) {
      word = 'человека'
    } else if (number === 0 || number === 1 || (11 <= number && number <= 14)) {
      word = 'человек'
    }
    return personCount > 0 ? (
      <span className="h1 badge bg-primary ">
        {personCount} {word} тусанет с тобой сегодня
      </span>
    ) : (
      <span className="h1 badge bg-danger ">Никто с тобой не тусанет</span>
    )
  }

  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <span key={quality._id} className={`badge bg-${quality.color} me-1`}>
              {quality.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(user._id)}>
            delete
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <>
      <h2>{renderPhrase(users.length)}</h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился,раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      )}
    </>
  )
}

export default Users
