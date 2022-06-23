import React, { useState } from "react"
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const renderPhrase = (number) => {
    let textContent = ''

    if (number === 0) {
      textContent = <span className="badge text-bg-danger">Никто с тобой не тусанёт</span>
    } else {
      textContent = <span className="badge text-bg-primary">{number} человек тусанёт с тобой сегодня</span>
    }

    return (
      <h2>
        {textContent}
      </h2>
    )
  }

  const handleDelete = (id) => {
    setUsers(prevState => {
      return prevState.filter(user => user._id !== id)
    })
  }

  return (
    <>
      {renderPhrase(users.length)}

      {users.length === 0
        ? ''
        : <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col" colSpan="2">Оценка</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map(quality => {
                      let classes = 'me-2 badge text-bg-'
                      classes += quality.color
                      return (
                        <span
                          key={quality._id}
                          className={classes}
                        >
                          {quality.name}
                        </span>
                      )
                    })}
                  </td>
                  <td key={user.profession._id}>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </>
  )
}

export default Users