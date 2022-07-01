import React from "react"
import PropTypes from "prop-types"
import Bookmark from "./bookmark"
import QualitiesList from "./qualitiesList"
import Table from "./table"

const UsersTable = ({
  users,
  onDelete,
  onBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => (
        <QualitiesList user={user} />
      )
    },
    professions: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user}
          onBookmark={onBookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          delete
        </button>
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
}

export default UsersTable