import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

const BookMark = ({ status, ...rest }) => {
  return <i className={'bi cursor-pointer' + (status ? ' bi-bookmark-fill' : ' bi-bookmark')} onClick={() => rest.onToogleBookMark(rest.userId)}></i>
}

export default BookMark
