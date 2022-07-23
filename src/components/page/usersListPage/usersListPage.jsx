import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination"
import GroupList from "../../common/groupList"
import api from "../../../api"
import SearchStatus from "../../ui/searchStatus"
import UsersTable from "../../ui/usersTable"
import _ from "lodash"

const UsersListPage = () => {
  const pageSize = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [users, setUsers] = useState()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
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

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const handleProfessionSelect = (item) => {
    setSearchQuery("")
    setSelectedProf(item)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  const handleSearchQuery = ({ target }) => {
    setSelectedProf()
    setSearchQuery(target.value)
  }

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((user) => (
        user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ))
      : selectedProf
        ? users.filter((user) => (
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        ))
        : users

    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <>
        <div className="d-flex ">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button className="btn btn-secondary m-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}

          <div className="d-flex flex-column">
            <SearchStatus users={count} />
            <input
              type="text"
              name="searchQuery"
              placeholder="Search..."
              onChange={handleSearchQuery}
              value={searchQuery}
            />
            {count > 0 && (
              <UsersTable
                users={userCrop}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onBookmark={handleToggleBookmark}
                onSort={handleSort}
              />
            )}

            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </>
    )
  }
  return "loading..."
}

export default UsersListPage
