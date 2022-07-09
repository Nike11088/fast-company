import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import {
    getQualities,
    getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions'

const EditUserPage = () => {
    const history = useHistory()
    const { currentUser, updateUserData } = useAuth()

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState({})

    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = transformData(qualities)

    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const professionsList = transformData(professions)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return

        await updateUserData({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        })

        history.push(`/users/${data._id}`)
    }
    function transformData(data) {
        return data.map((qual) => ({ label: qual.name, value: qual._id }))
    }
    const getQualitiesListByIds = (qualitiesIds) => {
        const qualitiesArray = []
        for (const qualityId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualityId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }

    useEffect(() => {
        if (!qualitiesLoading && !professionsLoading && currentUser && !data) {
            const userQualities = getQualitiesListByIds(currentUser.qualities)
            setData({
                ...currentUser,
                qualities: transformData(userQualities)
            })
        }
    }, [qualitiesLoading, professionsLoading, currentUser, data])
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])
    useEffect(() => {
        validate()
    }, [data])

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
                message: 'Email введен некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
            }
        }
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
