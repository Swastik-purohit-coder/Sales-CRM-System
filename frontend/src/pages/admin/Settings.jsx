import { useState } from 'react'
import { MoonStar, ShieldCheck, Sparkles } from 'lucide-react'

import Button from '../../components/common/Button.jsx'

const Settings = () => {
  const [compactMode, setCompactMode] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

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
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600" style={{ color: "#2563eb", letterSpacing: "2px", fontSize: "12px" }}>Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900" style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginTop: "8px" }}>Workspace Settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500" style={{ color: "#64748b", marginTop: "8px", fontSize: "14px" }}>Manage your local CRM display preferences, notification states, and platform variables.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
        {[
          { title: 'Compact mode', desc: 'Use denser spacing for tables, sidebars, and analytical cards.', value: compactMode, setValue: setCompactMode, icon: MoonStar, prefName: 'Display Theme' },
          { title: 'Email alerts', desc: 'Receive real-time local notifications and reminders for key client follow-ups.', value: emailAlerts, setValue: setEmailAlerts, icon: ShieldCheck, prefName: 'System Alerts' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div 
              key={item.title} 
              className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #f1f5f9",
                borderRadius: "24px",
                padding: "24px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default"
              }}
            >
              <div className="flex items-start justify-between gap-4" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <div>
                  <div className="flex items-center gap-2 text-blue-600" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Icon className="h-4 w-4" style={{ color: "#2563eb", width: "16px", height: "16px" }} />
                    <span className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "11px", color: "#2563eb", letterSpacing: "1.5px" }}>{item.prefName}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900" style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a", marginTop: "8px" }}>{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500" style={{ fontSize: "13px", color: "#64748b", marginTop: "6px", lineHeight: "1.5" }}>{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => item.setValue((current) => !current)}
                  style={{
                    width: "48px",
                    height: "26px",
                    borderRadius: "999px",
                    backgroundColor: item.value ? "#2563eb" : "#e2e8f0",
                    position: "relative",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    padding: "3px",
                    outline: "none",
                    flexShrink: 0
                  }}
                >
                  <span 
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      transform: item.value ? "translateX(22px)" : "translateX(0px)",
                      transition: "transform 0.2s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      display: "block"
                    }} 
                  />
                </button>
              </div>
            </div>
          )
        })}
      </section>

      <section 
        className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8"
        style={{
          borderRadius: "24px",
          padding: "32px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          boxShadow: "0 15px 35px -10px rgba(15, 23, 42, 0.2)",
          border: "none"
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px" }}>
          <div>
            <div className="flex items-center gap-2 text-blue-200" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#93c5fd" }}>
              <Sparkles className="h-4 w-4" style={{ width: "16px", height: "16px" }} />
              <span className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ fontSize: "11px", letterSpacing: "1.5px" }}>Workspace Policy</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight" style={{ fontSize: "22px", fontWeight: "600", marginTop: "8px" }}>Backend-first architecture</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300" style={{ fontSize: "14px", color: "#cbd5e1", marginTop: "6px" }}>All preferences are aligned to client configurations. Logic is kept inside service modules.</p>
          </div>
          <button 
            type="button" 
            style={{
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            Policy Active
          </button>
        </div>
      </section>
    </div>
  )
}

export default Settings