import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options.map((option) => {
                    const id = option.name + '_' + option.value
                    return (
                        <div key={id} className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={name}
                                id={id}
                                checked={option.value === value}
                                value={option.value}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={id}>
                                {option.name}
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
}

export default RadioField
