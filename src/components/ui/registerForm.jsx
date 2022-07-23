import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import api from "../../api"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import CheckBoxField from "../common/form/checkBoxField"

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  useEffect(() => {
    validate()
  }, [data])

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна к заполнению"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен к заполнению"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Пожалуйста, выберите свою профессию"
      }
    },
    licence: {
      isRequired: {
        message: "Чтобы использовать сервис, подтвердите лицензионное соглашение"
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
    if (isValid) {
      console.log(data)
    }
  }

  return (
    <>
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
        <CheckBoxField
          name="licence"
          value={data.licence}
          onChange={handleChange}
          error={errors.licence}
        >
          Подтвердить <a>лицензионное соглашение</a>
        </CheckBoxField>
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default RegisterForm
