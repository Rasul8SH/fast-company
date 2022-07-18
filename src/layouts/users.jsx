import React from "react"
import UsersList from "../components/usersList"
import User from "../components/userPage"
import { useParams } from "react-router-dom"

const Users = () => {
  const params = useParams()
  const { userId } = params

  return (
    userId ? <User id={userId} /> : <UsersList />
  )
}

export default Users
