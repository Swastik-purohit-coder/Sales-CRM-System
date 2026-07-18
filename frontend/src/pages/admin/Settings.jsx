import { useState } from 'react'
import { MoonStar, ShieldCheck, Sparkles } from 'lucide-react'

import Button from '../../components/common/Button.jsx'

const Settings = () => {
  const [compactMode, setCompactMode] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Workspace settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">These settings are currently local UI preferences because the backend does not expose a settings API.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {[
          { title: 'Compact mode', desc: 'Use denser spacing for tables and cards.', value: compactMode, setValue: setCompactMode, icon: MoonStar },
          { title: 'Email alerts', desc: 'Receive local reminders for key CRM events.', value: emailAlerts, setValue: setEmailAlerts, icon: ShieldCheck },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-blue-600"><Icon className="h-4 w-4" /><span className="text-sm font-semibold uppercase tracking-[0.22em]">Preference</span></div>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => item.setValue((current) => !current)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${item.value ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white transition ${item.value ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          )
        })}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-200"><Sparkles className="h-4 w-4" /><span className="text-sm font-semibold uppercase tracking-[0.22em]">Workspace policy</span></div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Backend-first architecture</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">All changes remain aligned to the current API surface without invented endpoints.</p>
          </div>
          <Button variant="secondary">Policy saved locally</Button>
        </div>
      </section>
    </div>
  )
}

export default Settings