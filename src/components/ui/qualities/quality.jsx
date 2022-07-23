import React from "react"

const Quality = ({ user }) => {
  return (
    user.qualities.map((quality) => (
      <span key={quality._id} className={"me-2 badge text-bg-" + quality.color}>
        {quality.name}
      </span>
    ))
  )
}

export default Quality
