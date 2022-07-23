import React from "react"
import Quality from "./quality"
import PropTypes from "prop-types"

const QualitiesList = ({ user }) => {
  return (
    <Quality user={user} />
  )
}

QualitiesList.propTypes = {
  user: PropTypes.object
}

export default QualitiesList
