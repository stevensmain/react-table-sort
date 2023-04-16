import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, type User } from './types.d'
import UserList from './components/UserList'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sortingBy, setSortingBy] = useState<SortBy>(SortBy.NONE)
  const [filter, setFilter] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const deleteUser = (email: string) => {
    const newUsers = users.filter((user) => user.email !== email)
    setUsers(newUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleSorting = (key: SortBy) => {
    const newSortingValue = sortingBy === key ? SortBy.NONE : key
    setSortingBy(newSortingValue)
  }

  const filteredUsers = useMemo(() => {
    return filter !== null && filter.length > 0
      ? users.filter((user) =>
          user.location.country.toLowerCase().includes(filter.toLowerCase())
        )
      : users
  }, [filter, users])

  const sortedUsers = useMemo(() => {
    if (sortingBy === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    }

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sortingBy]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sortingBy])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async (response) => await response.json())
      .then(({ results }) => {
        setUsers(results)
        originalUsers.current = results
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className="App">
      <h1>Users Table</h1>
      <header>
        <button onClick={toggleColors}>Colorize</button>
        <button
          onClick={() => {
            handleSorting(SortBy.COUNTRY)
          }}
        >
          Sort by country
        </button>
        <button onClick={resetUsers}>Reset initial users</button>
        <input
          type="text"
          onChange={(e) => {
            setFilter(e.target.value)
          }}
        />
      </header>
      <UserList
        sortUserBy={handleSorting}
        deleteUser={deleteUser}
        showColors={showColors}
        users={sortedUsers}
      />
    </div>
  )
}

export default App
