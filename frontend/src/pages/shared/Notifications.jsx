import { useEffect, useState } from 'react'
import { CheckCheck, Clock3, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import Pagination from '../../components/common/Pagination.jsx'
import Loader from '../../components/common/Loader.jsx'
import notificationService from '../../services/notificationService.js'
import { getApiErrorMessage } from '../../services/api.js'
import { formatDateTime } from '../../utils/formatDate.js'
import { NOTIFICATION_TYPE_LABELS, NOTIFICATION_STATUS_LABELS } from '../../utils/notificationLabels.js'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [isLoading, setIsLoading] = useState(true)

  const loadNotifications = async () => {
    setIsLoading(true)
    try {
      const data = await notificationService.getNotifications({ page: pagination.page, limit: pagination.limit })
      setNotifications(data.notifications || [])
      setPagination((current) => ({ ...current, ...data.pagination }))
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit])

  const handleRead = async (notificationId) => {
    try {
      await notificationService.markRead(notificationId)
      await loadNotifications()
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const handleDelete = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId)
      toast.success('Notification deleted')
      await loadNotifications()
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllRead()
      toast.success('All notifications marked as read')
      await loadNotifications()
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Notifications</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Notification center</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Mark items as read, clear them from the workspace, and keep important CRM events visible.
            </p>
          </div>

          <Button variant="secondary" onClick={handleMarkAllRead} leftIcon={<CheckCheck className="h-4 w-4" />}>
            Mark all read
          </Button>
        </div>
      </section>

      {isLoading ? (
        <Loader fullScreen label="Loading notifications" />
      ) : notifications.length ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`rounded-3xl border p-5 shadow-sm transition ${notification.isRead ? 'border-slate-200 bg-white' : 'border-blue-200 bg-blue-50/40'}`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    <span>{NOTIFICATION_TYPE_LABELS[notification.type] || notification.type}</span>
                    <span>•</span>
                    <span>{NOTIFICATION_STATUS_LABELS[notification.status] || notification.status}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{notification.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{notification.message}</p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5" /> {formatDateTime(notification.createdAt)}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {!notification.isRead ? (
                    <Button variant="secondary" size="sm" onClick={() => handleRead(notification._id)}>
                      Mark read
                    </Button>
                  ) : null}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(notification._id)} leftIcon={<Trash2 className="h-4 w-4" />}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Pagination pagination={pagination} onPageChange={(page) => setPagination((current) => ({ ...current, page }))} />
        </div>
      ) : (
        <EmptyState title="No notifications" description="There are no notifications to show right now." />
      )}
    </div>
  )
}

export default Notifications