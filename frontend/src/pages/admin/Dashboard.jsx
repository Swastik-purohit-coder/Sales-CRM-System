import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CalendarClock, ChartColumnBig, CircleDollarSign, FolderKanban, HandCoins, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import DashboardLoadingState from '../../components/dashboard/DashboardLoadingState.jsx'
import DashboardSectionCard from '../../components/dashboard/DashboardSectionCard.jsx'
import DashboardStatCard from '../../components/dashboard/DashboardStatCard.jsx'
import DashboardTable, { dateCell } from '../../components/dashboard/DashboardTable.jsx'
import { DashboardBarChart, DashboardLineChart, DashboardPieChart } from '../../components/dashboard/DashboardChartPanel.jsx'
import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import analyticsService from '../../services/analyticsService.js'
import { getApiErrorMessage } from '../../services/api.js'
import { formatDateOnly } from '../../utils/formatDate.js'
import { LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS } from '../../utils/dashboardLabels.js'

const statusOrder = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST']

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const toChartMonth = (entry) => `${monthNames[(entry.month || 1) - 1]} ${entry.year}`

const AdminDashboard = () => {
	const [dashboard, setDashboard] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let active = true

		const loadDashboard = async () => {
			try {
				const data = await analyticsService.getOverview()
				if (active) setDashboard(data)
			} catch (error) {
				toast.error(getApiErrorMessage(error))
			} finally {
				if (active) setIsLoading(false)
			}
		}

		loadDashboard()

		return () => {
			active = false
		}
	}, [])

	const overview = dashboard?.overview || {}

	const leadStatusData = useMemo(() => {
		return statusOrder.map((status) => {
			const found = dashboard?.leadStatus?.find((entry) => entry.status === status)
			return {
				status: LEAD_STATUS_LABELS[status] || status,
				count: found?.count || 0,
			}
		}).filter((entry) => entry.count > 0)
	}, [dashboard])

	const leadSourceData = useMemo(() => {
		return (dashboard?.leadSource || []).map((entry) => ({
			source: LEAD_SOURCE_LABELS[entry.source] || entry.source,
			count: entry.count,
		}))
	}, [dashboard])

	const monthlyLeadData = useMemo(() => {
		return (dashboard?.monthlyLeads || []).map((entry) => ({
			month: toChartMonth(entry),
			count: entry.count,
		}))
	}, [dashboard])

	const cards = [
		{ title: 'Total leads', value: overview.totalLeads ?? '0', icon: FolderKanban, accent: 'blue' },
		{ title: 'Active leads', value: overview.activeLeads ?? '0', icon: HandCoins, accent: 'emerald' },
		{ title: 'Won leads', value: overview.wonLeads ?? '0', icon: CircleDollarSign, accent: 'amber' },
		{ title: 'Sales reps', value: overview.totalSalesExecutives ?? '0', icon: Users, accent: 'slate' },
		{ title: 'Follow-ups today', value: overview.todayFollowUps ?? '0', icon: CalendarClock, accent: 'rose' },
		{ title: 'Conversion watch', value: overview.totalLeads ? `${Math.round(((overview.wonLeads || 0) / overview.totalLeads) * 100)}%` : '0%', icon: ChartColumnBig, accent: 'blue' },
	]

	const topSalesColumns = [
		{ key: 'fullName', label: 'Sales rep' },
		{ key: 'email', label: 'Email' },
		{ key: 'assignedLeads', label: 'Assigned leads' },
		{ key: 'wonLeads', label: 'Won leads' },
		{
			key: 'conversionRate',
			label: 'Conversion rate',
			render: (row) => `${row.conversionRate}%`,
		},
	]

	const recentLeadColumns = [
		{ key: 'name', label: 'Lead', render: (row) => row.name || '—' },
		{ key: 'company', label: 'Company', render: (row) => row.company || '—' },
		{ key: 'status', label: 'Status' },
		{ key: 'priority', label: 'Priority' },
		{ key: 'assignedTo', label: 'Assigned to', render: (row) => row.assignedTo?.fullName || 'Unassigned' },
		{ key: 'createdAt', label: 'Created', render: (row) => dateCell(row.createdAt) },
	]

	if (isLoading) {
		return <DashboardLoadingState />
	}

	if (!dashboard) {
		return (
			<EmptyState
				title="Dashboard unavailable"
				description="We could not load the dashboard data from the backend. Try refreshing the page."
				actionLabel="Refresh"
				onAction={() => window.location.reload()}
			/>
		)
	}

	return (
		<div className="space-y-6">
			<section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
				<div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
					<p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">Dashboard overview</p>
					<h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
						Your CRM command center for leads, conversions, and sales performance.
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
						Track pipeline health, inspect weekly trend lines, and keep the sales team focused on the right work.
					</p>

					<div className="mt-6 flex flex-wrap gap-3">
						<Link to="/admin/leads">
							<Button rightIcon={<ArrowRight className="h-4 w-4" />}>Manage leads</Button>
						</Link>
						<Link to="/admin/users">
							<Button variant="secondary">Manage users</Button>
						</Link>
					</div>
				</div>

				<div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Today&apos;s pulse</p>
					<div className="mt-5 space-y-4 text-sm text-slate-600">
						<div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
							<span>Today&apos;s follow-ups</span>
							<span className="font-semibold text-slate-900">{overview.todayFollowUps ?? 0}</span>
						</div>
						<div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
							<span>Won leads</span>
							<span className="font-semibold text-slate-900">{overview.wonLeads ?? 0}</span>
						</div>
						<div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
							<span>Active sales reps</span>
							<span className="font-semibold text-slate-900">{overview.totalSalesExecutives ?? 0}</span>
						</div>
						<div className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3 text-blue-900">
							<span>Last refreshed</span>
							<span className="font-semibold">{formatDateOnly(new Date())}</span>
						</div>
					</div>
				</div>
			</section>

			<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{cards.map((card) => (
					<DashboardStatCard key={card.title} {...card} />
				))}
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
				<DashboardSectionCard
					title="Monthly leads"
					subtitle="Lead creation trend across the backend data set"
				>
					{monthlyLeadData.length ? (
						<DashboardBarChart data={monthlyLeadData} xKey="month" dataKey="count" label="Leads" />
					) : (
						<EmptyState title="No monthly trend data" description="There is no lead history to chart yet." />
					)}
				</DashboardSectionCard>

				<DashboardSectionCard
					title="Lead status mix"
					subtitle="Current lead distribution by pipeline stage"
				>
					{leadStatusData.length ? (
						<DashboardPieChart data={leadStatusData} nameKey="status" valueKey="count" />
					) : (
						<EmptyState title="No status data" description="There are no leads yet to visualize." />
					)}
				</DashboardSectionCard>
			</section>

			<section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
				<DashboardSectionCard title="Lead sources" subtitle="Where your pipeline is coming from">
					{leadSourceData.length ? (
						<DashboardPieChart data={leadSourceData} nameKey="source" valueKey="count" />
					) : (
						<EmptyState title="No source data" description="Lead source breakdown is unavailable right now." />
					)}
				</DashboardSectionCard>

				<DashboardSectionCard title="Top sales executives" subtitle="Ranked by conversion and assignment volume">
					<DashboardTable
						rows={dashboard.topSalesExecutives || []}
						columns={topSalesColumns}
						emptyMessage="No sales performance data yet."
					/>
				</DashboardSectionCard>
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
				<DashboardSectionCard title="Recent leads" subtitle="Latest records created in the system">
					<DashboardTable
						rows={dashboard.recentLeads || []}
						columns={recentLeadColumns}
						emptyMessage="No recent leads yet."
					/>
				</DashboardSectionCard>

				<DashboardSectionCard title="Today&apos;s follow-ups" subtitle="Leads with follow-up dates due today">
					<DashboardTable
						rows={dashboard.todayFollowUps || []}
						columns={[
							{ key: 'name', label: 'Lead', render: (row) => row.name || '—' },
							{ key: 'company', label: 'Company', render: (row) => row.company || '—' },
							{ key: 'assignedTo', label: 'Assigned to', render: (row) => row.assignedTo?.fullName || 'Unassigned' },
							{ key: 'followUpDate', label: 'Follow-up', render: (row) => dateCell(row.followUpDate) },
						]}
						emptyMessage="No follow-ups scheduled for today."
					/>
				</DashboardSectionCard>
			</section>

			<section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
				<DashboardSectionCard title="Lead status trend" subtitle="Active lead movement across pipeline stages">
					{monthlyLeadData.length ? (
						<DashboardLineChart data={monthlyLeadData} xKey="month" dataKey="count" label="Leads" />
					) : (
						<EmptyState title="No trend data" description="We need more lead history before plotting a trend line." />
					)}
				</DashboardSectionCard>

				<DashboardSectionCard title="Quick actions" subtitle="Direct paths into the workspace">
					<div className="grid gap-3">
						{[
							{ label: 'Create lead', to: '/admin/leads' },
							{ label: 'Add user', to: '/admin/users' },
							{ label: 'Open notifications', to: '/notifications' },
							{ label: 'Open chat', to: '/chat' },
						].map((action) => (
							<Link key={action.label} to={action.to} className="group rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-blue-200 hover:bg-blue-50">
								<div className="flex items-center justify-between gap-3">
									<span className="text-sm font-medium text-slate-900">{action.label}</span>
									<ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
								</div>
							</Link>
						))}
					</div>
				</DashboardSectionCard>
			</section>
		</div>
	)
}

export default AdminDashboard
