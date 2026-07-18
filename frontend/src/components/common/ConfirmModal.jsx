import Modal from './Modal.jsx'
import Button from './Button.jsx'

const ConfirmModal = ({
  open,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onClose,
  onConfirm,
  isLoading = false,
  variant = 'danger',
}) => {
  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onClose}
      size="sm"
      footer={(
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      )}
    >
      <p className="text-sm text-slate-600">
        Please confirm that you want to proceed with this operation.
      </p>
    </Modal>
  )
}

export default ConfirmModal
