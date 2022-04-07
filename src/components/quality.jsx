import React from 'react'
import { generateKey } from '../util'

const Quality = ({ _id, name, color }) => {
  return (
    <span key={generateKey(_id)} className={`badge bg-${color} me-1`}>
      {name}
    </span>
  )
}

export default Quality
