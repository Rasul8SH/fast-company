import { React, useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../api"
import QualitiesList from "./qualitiesList"
import { useHistory } from "react-router-dom"

const User = ({ id }) => {
  const [user, setUser] = useState()
  const history = useHistory()
  useEffect(() => {
    api.users.getById(id).then(data => setUser(data))
  }, [])

  const handleClick = () => {
    history.push("/users")
  }

  return (
    user
      ? <ul className="list-group list-group-flush">
        <li className="list-group-item"><h1>{user.name}</h1></li>
        <li className="list-group-item"><h2>{user.profession.name}</h2></li>
        <li className="list-group-item"><QualitiesList user={user} /></li>
        <li className="list-group-item"><h4>Completed Meetings : {user.completedMeetings}</h4></li>
        <li className="list-group-item"><h2>Rate : {user.rate}</h2></li>
        <li>
          <button
            className="m-2"
            onClick={handleClick}
          >
            Все пользователи
          </button>
        </li>
      </ul>
      : "Loading..."
  )
}

User.propTypes = {
  id: PropTypes.string
}

export default User
