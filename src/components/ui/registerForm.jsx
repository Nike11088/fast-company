import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelect from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import api from '../../api'

const RegisterForm = () => {
    const [professions, setProfessions] = useState()
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
    })
    const [qualities, setQualities] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введён некорректно'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содеражть хотя бы одну цифру'
            },
            min: {
                message: 'Пароль должен состоять минимум из 8 символов',
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        validate()
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Профессия"
                onChange={handleChange}
                options={professions}
                value={data.profession}
                defaultOption="Выбрать..."
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: 'Мужской', value: 'male' },
                    { name: 'Женский', value: 'female' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Пол"
            />
            <MultiSelect
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Качества"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100"
            >
                Войти
            </button>
        </form>
    )
}

export default RegisterForm
