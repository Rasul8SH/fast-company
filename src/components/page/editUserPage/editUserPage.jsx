import React, { useState, useEffect } from "react"
import { validator } from "../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { useHistory, useParams } from "react-router-dom"
import api from "../../../api"

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  })

  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState({})
  const [qualities, setQualities] = useState({})

  const getProfessionById = (id) => {
    let updateProf = {}
    for (const profName in professions) {
      if (professions[profName]._id === id) {
        updateProf = professions[profName]
      }
    }
    return updateProf
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const qual in qualities) {
        if (elem.value === qualities[qual]._id) {
          qualitiesArray.push(qualities[qual])
        }
      }
    }
    return qualitiesArray
  }

  const transformData = (data) =>
    data.map((qual) => ({ label: qual.name, value: qual._id }))

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(userId).then(({ profession, qualities, ...data }) => {
      setData(prevState => ({
        ...prevState,
        ...data,
        profession: profession._id,
        qualities: transformData(qualities)
      }))
    })
    api.professions.fetchAll().then((data) => setProfessions(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    if (data.qualities) setIsLoading(false)
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна к заполнению"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { profession, qualities } = data
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`))
    console.log("data:", data)
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">

            {!isLoading && Object.keys(professions).length > 0
              ? (<form onSubmit={handleSubmit}>
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
                  label="Профессия"
                  name="profession"
                  value={data.profession}
                  onChange={handleChange}
                  error={errors.profession}
                  options={professions}
                  defaultOption="Выберите профессию"
                />
                <RadioField
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                  ]}
                  value={data.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Выберите пол"
                />
                <MultiSelectField
                  options={qualities}
                  onChange={handleChange}
                  defaultValue={data.qualities}
                  name="qualities"
                  label="Выберите качества"
                />
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto"
                >
                  Обновить
                </button>
              </form>)
              : ("Loading...")
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserPage
