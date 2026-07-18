import { useEffect, useState } from 'react'
import { Activity, Filter, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import Input from '../../components/common/Input.jsx'
import Pagination from '../../components/common/Pagination.jsx'
import Loader from '../../components/common/Loader.jsx'
import api, { getApiErrorMessage, extractApiData } from '../../services/api.js'
import { formatDateTime } from '../../utils/formatDate.js'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadLogs = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/activities', {
        params: { page: pagination.page, limit: pagination.limit, search, sortBy: 'createdAt', order: 'desc' },
      })
      const data = extractApiData(response)
      setLogs(data.activities || [])
      setPagination((current) => ({ ...current, ...data.pagination }))
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit])

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Activity logs</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Audit timeline</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Track CRM actions and review lead activity across the system.</p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={loadLogs} leftIcon={<Filter className="h-4 w-4" />}>Refresh</Button>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">{pagination.total || 0} events</div>
          </div>
        </div>

        <div className="mt-6 max-w-xl">
          <Input label="Search logs" placeholder="Search messages or remarks" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </section>

      {isLoading ? (
        <Loader fullScreen label="Loading activity logs" />
      ) : logs.length ? (
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    <span>{log.action}</span>
                    <span>•</span>
                    <span>{log.level}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{log.message}</h3>
                  <p className="mt-2 text-sm text-slate-500">Performed by {log.performedBy?.fullName || 'Unknown'} on {formatDateTime(log.createdAt)}</p>
                </div>

                <Button variant="danger" size="sm" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => toast('Delete is reserved for the backend admin action.')}>Delete</Button>
              </div>
            </div>
          ))}

          <Pagination pagination={pagination} onPageChange={(page) => setPagination((current) => ({ ...current, page }))} />
        </div>
      ) : (
        <EmptyState title="No activities" description="No activity logs were found for the current filters." icon={<Activity className="h-6 w-6" />} />
      )}
    </div>
  )
}

export default ActivityLogs