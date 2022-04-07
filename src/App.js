import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

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
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onToogleBookMark={handleToogleBookMark} />
    </>
  )
}

export default App
