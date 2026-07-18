import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserCheck } from 'lucide-react'

import Modal from '../common/Modal.jsx'
import Button from '../common/Button.jsx'

const LeadAssignModal = ({
  open,
  lead,
  salesUsers = [],
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      assignedTo: lead?.assignedTo?._id || lead?.assignedTo || '',
    },
  })

  useEffect(() => {
    if (lead) {
      reset({
        assignedTo: lead.assignedTo?._id || lead.assignedTo || '',
      })
    }
  }, [lead, reset, open])

  const submitHandler = async (values) => {
    await onSubmit(lead, values.assignedTo)
  }

  return (
    <Modal
      open={open}
      title="Assign Lead"
      description={`Select a sales executive for "${lead?.name || 'this lead'}"`}
      onClose={onClose}
      size="md"
      footer={(
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit(submitHandler)}
            isLoading={isSubmitting}
            leftIcon={<UserCheck className="h-4 w-4" />}
          >
            Assign Lead
          </Button>
        </div>
      )}
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Sales Executive</label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
            {...register('assignedTo')}
          >
            <option value="">Unassigned</option>
            {salesUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName} ({user.email})
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  )
}

export default LeadAssignModal
