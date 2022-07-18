import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [sortedColumn, setSortedColumn] = useState({})

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            const order = selectedSort.order === 'asc' ? 'desc' : 'asc'
            setSortedColumn({ path: item, order: order })
            onSort({
                ...selectedSort,
                order: order
            })
        } else {
            setSortedColumn({ path: item, order: 'asc' })
            onSort({ path: item, order: 'asc' })
        }
    }

    const renderSortArrow = (path) => {
        if (sortedColumn.path && sortedColumn.path === path) {
            return sortedColumn.order === 'asc' ? (
                <i className="bi bi-caret-up-fill"></i>
            ) : (
                <i className="bi bi-caret-down-fill"></i>
            )
        } else return ''
    }

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && 'button' }}
                        scope="col"
                    >
                        {columns[column].name}
                        {renderSortArrow(columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader
