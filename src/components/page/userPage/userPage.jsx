import { React, useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import Qualities from "../../ui/qualities"
import { useHistory } from "react-router-dom"

const User = ({ userId }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  useEffect(() => {
    api.users.getById(userId).then(data => setUser(data))
  }, [])

  const handleClick = () => {
    history.push(history.location.pathname + "/edit")
  }

  return (
    user
      ? (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h2>Имя: {user.name}</h2>
          </li>
          <li className="list-group-item">
            <h2>email: {user.email}</h2>
          </li>
          <li className="list-group-item">
            <h4>Пол: {user.sex}</h4>
          </li>
          <li className="list-group-item">
            <h4>Профессия: {user.profession.name}</h4>
          </li>
          <li className="list-group-item">
            <h4>Качества: </h4>
            <Qualities user={user} />
          </li>
          <li className="list-group-item">
            <h4>Завершенные встречи: {user.completedMeetings}</h4>
          </li>
          <li className="list-group-item">
            <h4>Рейтинг : {user.rate}</h4>
          </li>
          <li>
            <button
              className="m-2"
              onClick={handleClick}
            >
              Изменить
            </button>
          </li>
        </ul>)
      : ("Loading...")
  )
}

User.propTypes = {
  userId: PropTypes.string
}

export default User
