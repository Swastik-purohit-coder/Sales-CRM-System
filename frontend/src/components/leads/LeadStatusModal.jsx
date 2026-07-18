import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RefreshCw } from 'lucide-react'

import Modal from '../common/Modal.jsx'
import Button from '../common/Button.jsx'
import { LEAD_STATUS_LABELS } from '../../utils/dashboardLabels.js'

const LeadStatusModal = ({
  open,
  lead,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: lead?.status || 'NEW',
    },
  })

  useEffect(() => {
    if (lead) {
      reset({ status: lead.status })
    }
  }, [lead, reset, open])

  const submitHandler = async (values) => {
    await onSubmit(lead, values.status)
  }

  return (
    <Modal
      open={open}
      title="Update Lead Status"
      description={`Change the pipeline stage for "${lead?.name || 'this lead'}"`}
      onClose={onClose}
      size="sm"
      footer={(
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit(submitHandler)}
            isLoading={isSubmitting}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Update Status
          </Button>
        </div>
      )}
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Select Status</label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            {...register('status', { required: true })}
          >
            {Object.entries(LEAD_STATUS_LABELS).map(([key, val]) => (
              <option key={key} value={key}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  )
}

export default LeadStatusModal
