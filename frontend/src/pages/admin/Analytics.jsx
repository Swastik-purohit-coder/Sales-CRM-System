import { useEffect, useState } from 'react'
import { BarChart3, PieChart, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

import analyticsService from '../../services/analyticsService.js'
import { getApiErrorMessage } from '../../services/api.js'
import DashboardSectionCard from '../../components/dashboard/DashboardSectionCard.jsx'
import DashboardLoadingState from '../../components/dashboard/DashboardLoadingState.jsx'
import { DashboardBarChart, DashboardPieChart } from '../../components/dashboard/DashboardChartPanel.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'

const Analytics = () => {
  const [dashboard, setDashboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await analyticsService.getOverview()
        setDashboard(data)
      } catch (error) {
        toast.error(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  if (isLoading) return <DashboardLoadingState />

  if (!dashboard) {
    return <EmptyState title="Analytics unavailable" description="Unable to load analytics from the backend." icon={<Sparkles className="h-6 w-6" />} />
  }

  const monthly = (dashboard.monthlyLeads || []).map((item) => ({ month: `${item.month}/${item.year}`, count: item.count }))
  const status = (dashboard.leadStatus || []).map((item) => ({ status: item.status, count: item.count }))

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Analytics</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Pipeline analytics</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">This page reuses the backend dashboard statistics so analytics stay accurate and consistent.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardSectionCard title="Lead trend" subtitle="Monthly lead creation" icon={<BarChart3 className="h-4 w-4" />}>
          {monthly.length ? <DashboardBarChart data={monthly} xKey="month" dataKey="count" label="Leads" /> : <EmptyState title="No trend data" description="No monthly lead data is available yet." />}
        </DashboardSectionCard>

        <DashboardSectionCard title="Lead status mix" subtitle="Current pipeline distribution" icon={<PieChart className="h-4 w-4" />}>
          {status.length ? <DashboardPieChart data={status} nameKey="status" valueKey="count" /> : <EmptyState title="No status data" description="No lead status data is available yet." />}
        </DashboardSectionCard>
      </div>
    </div>
  )
}

export default Analytics