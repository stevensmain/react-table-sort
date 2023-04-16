import { SortBy, type User } from '../types.d'

interface Props {
  sortUserBy: (key: SortBy) => void
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
}

const UserList = ({ sortUserBy, deleteUser, showColors, users }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Fotos</th>
          <th
            className="cursor-pointer"
            onClick={() => {
              sortUserBy(SortBy.NAME)
            }}
          >
            Nombre
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              sortUserBy(SortBy.LAST)
            }}
          >
            Apellido
          </th>
          <th
            className="cursor-pointer"
            onClick={() => {
              sortUserBy(SortBy.COUNTRY)
            }}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table-colors' : 'table'}>
        {users.map((user) => {
          return (
            <tr key={user.email}>
              <td>
                <img src={user.picture.medium} alt={user.name.title} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UserList
