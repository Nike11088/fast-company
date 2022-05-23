import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelect from '../../common/form/multiSelectField'
import api from '../../../api'

const UserEditForm = () => {
    const params = useParams()
    const history = useHistory()

    const { userId } = params

    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()
    const [qualities, setQualities] = useState({})
    const [user, setUser] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])
    useEffect(
        () =>
            api.users.getById(userId).then((user) => {
                setUser(user)
            }),
        []
    )

    const isValid = Object.keys(errors).length === 0

    const handleChange = (target) => {
        if (target.name === 'profession') {
            target.value = professions.find((p) => p._id === target.value)
        }

        if (target.name === 'qualities' && Array.isArray(target.value)) {
            const userQualities = []
            target.value.forEach((item) => {
                const id = item.value
                const qualitiesArray = Object.keys(qualities).map(
                    (qualityName) => ({
                        _id: qualities[qualityName]._id,
                        name: qualities[qualityName].name,
                        color: qualities[qualityName].color
                    })
                )
                const quality = qualitiesArray.find((q) => q._id === id)
                if (quality) {
                    userQualities.push(quality)
                }
            })
            target.value = userQualities
        }

        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = () => {
        api.users.update(user._id, user)
        history.push(`/users/${userId}`)
    }

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введён некорректно'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [user])

    const validate = () => {
        const errors = validator(user, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    return user ? (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            type="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Профессия"
                            name="profession"
                            onChange={handleChange}
                            options={professions}
                            value={user.profession._id}
                            defaultOption="Выбрать..."
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: 'Мужской', value: 'male' },
                                { name: 'Женский', value: 'female' }
                            ]}
                            value={user.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Пол"
                        />
                        <MultiSelect
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={user.qualities.map((q) => ({
                                label: q.name,
                                value: q._id
                            }))}
                            name="qualities"
                            label="Качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100"
                        >
                            Обновить
                        </button>
                    </form>
                </div>{' '}
            </div>{' '}
        </div>
    ) : (
        'Loading'
    )
}
export default UserEditForm
