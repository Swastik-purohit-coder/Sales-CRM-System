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
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
      setPagination((current) => ({ ...current, page: 1 }))
    }, 500)
    return () => clearTimeout(handler)
  }, [search])

  const loadLogs = async () => {
    setIsLoading(true)
    try {
      const response = await api.get('/activities', {
        params: { page: pagination.page, limit: pagination.limit, search: debouncedSearch, sortBy: 'createdAt', order: 'desc' },
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
  }, [pagination.page, pagination.limit, debouncedSearch])

  const getLevelStyles = (level) => {
    const l = level?.toLowerCase()
    if (l === 'error' || l === 'critical') {
      return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca', label: 'Critical' }
    }
    if (l === 'warn' || l === 'warning') {
      return { bg: '#fffbeb', text: '#d97706', border: '#fde68a', label: 'Warning' }
    }
    if (l === 'success') {
      return { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0', label: 'Success' }
    }
    return { bg: '#f0f9ff', text: '#0284c7', border: '#bae6fd', label: 'Info' }
  }

  return (
    <div className="space-y-6" style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <section 
        className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
        style={{
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid #f1f5f9"
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600" style={{ color: "#2563eb", letterSpacing: "2px", fontSize: "12px" }}>Activity Logs</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900" style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginTop: "8px" }}>Audit Timeline</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500" style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>Track system events, changes, and lead assignment histories chronologically.</p>
          </div>

          <div className="flex gap-3" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Button variant="secondary" onClick={loadLogs} leftIcon={<Filter className="h-4 w-4" />}>Refresh</Button>
            <div 
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
              style={{
                borderRadius: "12px",
                backgroundColor: "#f1f5f9",
                border: "1px solid #e2e8f0",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#475569",
                fontWeight: "500"
              }}
            >
              {pagination.total || 0} events
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-xl" style={{ marginTop: "24px" }}>
          <Input label="Search logs" placeholder="Search messages or remarks..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
      </section>

      {isLoading ? (
        <Loader fullScreen label="Loading activity logs" />
      ) : logs.length ? (
        <div className="space-y-6" style={{ position: "relative", paddingLeft: "24px", marginTop: "32px" }}>
          {/* Vertical Timeline Stem */}
          <div 
            style={{
              position: "absolute",
              left: "6px",
              top: "10px",
              bottom: "10px",
              width: "2px",
              backgroundColor: "#e2e8f0",
              zIndex: 1
            }}
          />

          {logs.map((log) => {
            const levelStyle = getLevelStyles(log.level)
            return (
              <div 
                key={log._id} 
                style={{
                  position: "relative",
                  marginBottom: "20px",
                  zIndex: 2
                }}
              >
                {/* Timeline Dot Indicator */}
                <div 
                  style={{
                    position: "absolute",
                    left: "-23px",
                    top: "22px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: levelStyle.text,
                    border: "3px solid #ffffff",
                    boxShadow: "0 0 0 2px #e2e8f0"
                  }}
                />

                <div 
                  className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1f5f9",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.03)",
                    transition: "transform 0.2s ease"
                  }}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <div className="flex flex-wrap items-center gap-2" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span 
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            color: "#64748b"
                          }}
                        >
                          {log.action}
                        </span>
                        <span style={{ color: "#cbd5e1" }}>•</span>
                        <span 
                          style={{
                            fontSize: "10px",
                            fontWeight: "600",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            backgroundColor: levelStyle.bg,
                            color: levelStyle.text,
                            border: `1px solid ${levelStyle.border}`
                          }}
                        >
                          {levelStyle.label}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900" style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", marginTop: "8px" }}>{log.message}</h3>
                      {log.remarks && (
                        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px", backgroundColor: "#f8fafc", padding: "8px 12px", borderRadius: "8px", borderLeft: "3px solid #cbd5e1" }}>
                          {log.remarks}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-slate-500" style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
                        Performed by <strong style={{ color: "#475569" }}>{log.performedBy?.fullName || 'System'}</strong> • {formatDateTime(log.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <Pagination pagination={pagination} onPageChange={(page) => setPagination((current) => ({ ...current, page }))} />
        </div>
      ) : (
        <EmptyState title="No activities" description="No activity logs were found for the current filters." icon={<Activity className="h-6 w-6" />} />
      )}
    </div>
  )
}

export default ActivityLogs