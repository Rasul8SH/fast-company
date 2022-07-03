import React from "react"
import UsersList from "./usersList"
import User from "./user"
import { useParams } from "react-router-dom"

const Users = () => {
  const params = useParams()
  const { userId } = params

  return (
    userId ? <User id={userId} /> : <UsersList />
  )
}

export default Users
