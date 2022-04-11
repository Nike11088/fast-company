import React from 'react'
import Quality from './quality'
import BookMark from './bookmark'
import PropTypes from 'prop-types'

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onDelete,
    onToogleBookMark
}) => {
    return (
        <tr key={_id}>
            <td>{name}</td>
            <td>
                {qualities.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark
                    status={bookmark}
                    {...{
                        userId: _id,
                        onToogleBookMark: () => onToogleBookMark(_id)
                    }}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onToogleBookMark: PropTypes.func.isRequired
}

export default User
