import { useEffect, useMemo, useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import LeadFilters from '../../components/leads/LeadFilters.jsx'
import LeadFormModal from '../../components/leads/LeadFormModal.jsx'
import LeadTable from '../../components/leads/LeadTable.jsx'
import Pagination from '../../components/common/Pagination.jsx'
import Loader from '../../components/common/Loader.jsx'
import ConfirmModal from '../../components/common/ConfirmModal.jsx'
import LeadStatusModal from '../../components/leads/LeadStatusModal.jsx'
import LeadAssignModal from '../../components/leads/LeadAssignModal.jsx'
import useDebounce from '../../hooks/useDebounce.js'
import leadService from '../../services/leadService.js'
import userService from '../../services/userService.js'
import { getApiErrorMessage } from '../../services/api.js'
import { useAuthContext } from '../../context/AuthContext.jsx'

const DEFAULT_LIMIT = 8

const defaultFilters = {
  search: '',
  status: 'ALL',
  priority: 'ALL',
  source: 'ALL',
}

const normalizeLeadParams = (filters, pagination, user) => ({
  page: pagination.page,
  limit: pagination.limit,
  search: filters.search.trim(),
  status: filters.status === 'ALL' ? undefined : filters.status,
  priority: filters.priority === 'ALL' ? undefined : filters.priority,
  source: filters.source === 'ALL' ? undefined : filters.source,
  assignedTo: user?.role === 'sales' ? user._id : undefined,
  sortBy: 'createdAt',
  order: 'desc',
})

const Leads = ({ scope = 'admin' }) => {
  const { user } = useAuthContext()
  const [filters, setFilters] = useState(defaultFilters)
  const debouncedSearch = useDebounce(filters.search, 400)
  const [pagination, setPagination] = useState({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 })
  const [leads, setLeads] = useState([])
  const [salesUsers, setSalesUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedLead, setSelectedLead] = useState(null)
  const [assignLead, setAssignLead] = useState(null)
  const [selectedStatusLead, setSelectedStatusLead] = useState(null)
  const [deleteLeadItem, setDeleteLeadItem] = useState(null)
  const [statusLeadItem, setStatusLeadItem] = useState(null)
  const [assignLeadItem, setAssignLeadItem] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isStatusUpdating, setIsStatusUpdating] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)

  const canManageAssignment = scope === 'admin' && user?.role === 'admin'
  const canCreate = scope === 'admin' && user?.role === 'admin'
  const canEdit = scope === 'admin' && user?.role === 'admin'

  const leadParams = useMemo(() => normalizeLeadParams({ ...filters, search: debouncedSearch }, pagination, user), [debouncedSearch, filters, pagination, user])

  const loadLeads = async (mode = 'refresh') => {
    if (mode === 'initial') {
      setIsLoading(true)
    } else {
      setIsRefreshing(true)
    }

    try {
      const [leadData, usersData] = await Promise.all([
        leadService.getLeads(leadParams),
        canManageAssignment ? userService.getUsers({ page: 1, limit: 100, role: 'sales' }) : Promise.resolve({ users: [] }),
      ])

      setLeads(leadData.leads || [])
      setPagination((current) => ({ ...current, ...leadData.pagination }))
      setSalesUsers(usersData.users || [])
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadLeads(isLoading ? 'initial' : 'refresh')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadParams.page, leadParams.limit, leadParams.search, leadParams.status, leadParams.priority, leadParams.source, user?._id])

  const openCreate = () => {
    setModalMode('create')
    setSelectedLead(null)
    setModalOpen(true)
  }

  const openEdit = (lead) => {
    setModalMode('edit')
    setSelectedLead(lead)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedLead(null)
  }

  const submitLead = async (payload) => {
    setIsSubmitting(true)
    try {
      if (modalMode === 'create') {
        await leadService.createLead(payload)
        toast.success('Lead created successfully')
      } else if (selectedLead) {
        await leadService.updateLead(selectedLead._id, payload)
        toast.success('Lead updated successfully')
      }

      closeModal()
      await loadLeads('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateLeadStatus = async (lead) => {
    const nextStatus = window.prompt('Enter the new lead status (NEW, CONTACTED, QUALIFIED, PROPOSAL_SENT, NEGOTIATION, WON, LOST):', lead.status)
    if (!nextStatus) return

    try {
      await leadService.updateLeadStatus(lead._id, { status: nextStatus.trim().toUpperCase() })
      toast.success('Lead status updated')
      await loadLeads('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const deleteLead = async (lead) => {
    if (!window.confirm(`Delete ${lead.name}? This lead will be soft deleted.`)) return

    try {
      await leadService.deleteLead(lead._id)
      toast.success('Lead deleted successfully')
      await loadLeads('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const assignLeadHandler = async (lead) => {
    if (!canManageAssignment) return

    const assignedTo = window.prompt('Enter the sales user ID to assign this lead:')
    if (!assignedTo) return

    try {
      await leadService.assignLead(lead._id, { assignedTo })
      toast.success('Lead assigned successfully')
      await loadLeads('refresh')
    } catch (error) {
      toast.error(getApiErrorMessage(error))
    }
  }

  const emptyStateAction = canCreate ? openCreate : undefined

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Leads</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {scope === 'sales' ? 'My leads' : 'Lead pipeline'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Search, filter, update, and manage leads against the existing backend contract.
            </p>
          </div>

          <div className="flex gap-3">
            {canCreate ? (
              <Button onClick={openCreate} leftIcon={<Plus className="h-4 w-4" />}>Add lead</Button>
            ) : null}
            <Button variant="secondary" onClick={() => loadLeads('refresh')} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Refresh
            </Button>
          </div>
        </div>
      </section>

      <LeadFilters
        filters={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
      />

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <Loader fullScreen label="Loading leads" />
        </div>
      ) : leads.length ? (
        <>
          <LeadTable
            leads={leads}
            onEdit={canEdit ? openEdit : () => toast('Edit is available for admin users')}
            onStatus={updateLeadStatus}
            onDelete={canEdit ? deleteLead : () => toast('Delete is available for admin users')}
            onAssign={assignLeadHandler}
            canManageAssignment={canManageAssignment}
          />

          <Pagination
            pagination={pagination}
            onPageChange={(page) => setPagination((current) => ({ ...current, page }))}
          />
        </>
      ) : (
        <EmptyState
          title="No leads found"
          description="Try adjusting the current filters or add a new lead."
          actionLabel={emptyStateAction ? 'Add lead' : undefined}
          onAction={emptyStateAction}
        />
      )}

      <LeadFormModal
        open={modalOpen}
        mode={modalMode}
        lead={selectedLead}
        salesUsers={salesUsers}
        onClose={closeModal}
        onSubmit={submitLead}
        isSubmitting={isSubmitting}
        canAssign={canManageAssignment}
      />
    </div>
  )
}

export default Leads