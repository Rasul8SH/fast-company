import React, { useState } from "react"
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (id) => {
    setUsers(users.filter(user => user._id !== id))
  }

  return (
    <>
      <h2>
        <span className={"badge text-bg-" + (users.length > 0 ? "primary" : "danger")}>
          {users.length > 0
            ? `${users.length} человек тусанёт с тобой сегодня`
            : `Никто с тобой не тусанёт`}
        </span>
      </h2>


      {users.length > 0 &&
        <table className="table">
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map(quality => (
                    <span
                      key={quality._id}
                      className={"me-2 badge text-bg-" + quality.color}
                    >
                      {quality.name}
                    </span>
                  ))}
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
            )}
          </tbody>
        </table>}
    </>
  )
}

export default Users