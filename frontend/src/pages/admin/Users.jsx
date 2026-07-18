import { useEffect, useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import Input from '../../components/common/Input.jsx'
import Loader from '../../components/common/Loader.jsx'
import Pagination from '../../components/common/Pagination.jsx'
import UserFormModal from '../../components/users/UserFormModal.jsx'
import UsersTable from '../../components/users/UsersTable.jsx'
import useDebounce from '../../hooks/useDebounce.js'
import userService from '../../services/userService.js'
import { getApiErrorMessage } from '../../services/api.js'

const DEFAULT_LIMIT = 8

const Users = () => {
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 })
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const params = useMemo(() => ({
    page: pagination.page,
    limit: pagination.limit,
    search: debouncedSearch.trim(),
    sortBy: 'createdAt',
    order: 'desc',
  }), [debouncedSearch, pagination.limit, pagination.page])

  const loadUsers = async (loadingState = 'refresh') => {
    if (loadingState === 'initial') {
      setIsLoading(true)
    } else {
      setIsRefreshing(true)
    }

    try {
      const data = await userService.getUsers(params)
      setUsers(data.users || [])
      setPagination((current) => ({
        ...current,
        ...data.pagination,
      }))
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadUsers(isLoading ? 'initial' : 'refresh')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page, params.limit, params.search])

  const openCreateModal = () => {
    setModalMode('create')
    setSelectedUser(null)
    setModalOpen(true)
  }

  const openEditModal = (user) => {
    setModalMode('edit')
    setSelectedUser(user)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }

  const handleSubmitUser = async (payload) => {
    setIsSubmitting(true)

    try {
      if (modalMode === 'create') {
        await userService.createUser(payload)
        toast.success('Sales user created successfully')
      } else if (selectedUser) {
        await userService.updateUser(selectedUser._id, payload)
        toast.success('User updated successfully')
      }

      closeModal()
      await loadUsers('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleStatus = async (user) => {
    const confirmText = user.isActive ? 'deactivate' : 'activate'

    if (!window.confirm(`Are you sure you want to ${confirmText} ${user.fullName}?`)) {
      return
    }

    try {
      await userService.toggleUserStatus(user._id)
      toast.success(`User ${confirmText}d successfully`)
      await loadUsers('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.fullName}? This action cannot be undone.`)) {
      return
    }

    try {
      await userService.deleteUser(user._id)
      toast.success('User deleted successfully')
      await loadUsers('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">User management</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Sales users</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Search, create, update, activate, deactivate, and soft-delete sales users using the exact backend contract.
            </p>
          </div>

          <Button onClick={openCreateModal} leftIcon={<Plus className="h-4 w-4" />}>
            Add sales user
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <Input
            label="Search users"
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              {pagination.total || 0} total users
            </div>
            {isRefreshing ? <Loader label="Refreshing" /> : null}
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm">
          <Loader fullScreen label="Loading users" />
        </div>
      ) : users.length ? (
        <>
          <UsersTable
            users={users}
            onEdit={openEditModal}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />

          <Pagination
            pagination={pagination}
            onPageChange={(page) => setPagination((current) => ({ ...current, page }))}
          />
        </>
      ) : (
        <EmptyState
          title="No users found"
          description={search ? 'Try a different search term or clear the current search.' : 'Create the first sales user to get started.'}
          actionLabel="Add sales user"
          onAction={openCreateModal}
        />
      )}

      <UserFormModal
        open={modalOpen}
        mode={modalMode}
        user={selectedUser}
        onClose={closeModal}
        onSubmit={handleSubmitUser}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default Users