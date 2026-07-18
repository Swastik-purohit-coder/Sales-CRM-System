import { useState } from 'react'
import { CalendarClock, Mail, Phone, ShieldCheck, UserCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

import ProfileForm from '../../components/profile/ProfileForm.jsx'
import Button from '../../components/common/Button.jsx'
import useAuth from '../../hooks/useAuth.js'
import { formatDateTime } from '../../utils/formatDate.js'

const Profile = () => {
  const { user, refreshProfile, updateLocalUser } = useAuth()
  const [isSaving, setIsSaving] = useState(false)

  const saveProfile = async (values) => {
    setIsSaving(true)
    try {
      updateLocalUser(values)
      toast.success('Profile updated locally')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <UserCircle2 className="h-10 w-10" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Profile</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{user?.fullName || 'Your account'}</h1>
              <p className="mt-2 text-sm text-slate-500">{user?.role || 'user'} account details and local session profile editing.</p>
            </div>
          </div>

          <Button variant="secondary" onClick={refreshProfile}>
            Refresh from backend
          </Button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Edit profile</h2>
          <p className="mt-1 text-sm text-slate-500">These changes update the current authenticated session state only because the backend does not expose a profile update endpoint.</p>
          <div className="mt-6">
            <ProfileForm user={user} onSave={saveProfile} isSaving={isSaving} />
          </div>
        </div>

        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">Account summary</p>
          <div className="space-y-3 text-sm text-slate-200">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-blue-200" /> Email</span>
              <span>{user?.email || '—'}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-blue-200" /> Phone</span>
              <span>{user?.phone || '—'}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue-200" /> Role</span>
              <span className="capitalize">{user?.role || '—'}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-blue-200" /> Last login</span>
              <span>{formatDateTime(user?.lastLogin)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile