import React, { useState, useEffect } from "react"
import UsersList from "./components/usersList"
import api from "./api"

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data))
  }, [])

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id))
  }
  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((item) => {
        if (item._id === id) {
          item.bookmark = !item.bookmark
        }
        return item
      })
    )
  }

  return (
    <>
      {users &&
        <UsersList
          users={users}
          onDelete={handleDelete}
          onBookmark={handleToggleBookmark}
        />}
    </>
  )
}

export default App
