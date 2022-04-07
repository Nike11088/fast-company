import React from 'react'
import Quality from './quality'
import BookMark from './bookmark'
import { generateKey } from '../util'

const User = (props) => {
  const { _id, name, qualities, profession, completedMeetings, rate, bookmark, onDelete, onToogleBookMark } = props

  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={generateKey(quality._id)} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <BookMark status={bookmark} {...{ userId: _id, onToogleBookMark: () => onToogleBookMark(_id) }} />
      </td>
      <td>
        <button className="btn btn-danger btn-sm m-2" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
