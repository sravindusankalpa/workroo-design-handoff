import Link from "next/link";

const NAV = [
  { group: null, href: "/dashboard", label: "Dashboard", icon: "icon-dashboard.svg" },
  { group: "JOBS", href: "/job-schedule", label: "Job Schedule", icon: "icon-schedule.svg" },
  { group: null, href: "/jobs", label: "Jobs", icon: "icon-jobs.svg" },
  { group: null, href: "/quick-job", label: "Quick Job View", icon: "icon-quick-job.svg" },
  { group: null, href: "/job-composer", label: "Job Composer", icon: "icon-composer.svg" },
  { group: null, href: "/job-templates", label: "Job Templates", icon: "icon-templates.svg" },
  { group: null, href: "/invoices", label: "Invoices", icon: "icon-invoices.svg", badge: "12" },
  { group: "QUOTES", href: "/quotation-jobs", label: "Quotation Jobs", icon: "icon-quotation.svg" },
  { group: null, href: "/quick-quote", label: "Quick Quotation View", icon: "icon-quick-quote.svg" },
  { group: "BUSINESS", href: "/booking-requests", label: "Booking Requests", icon: "icon-booking.svg" },
  { group: null, href: "/inventory", label: "Inventory", icon: "icon-inventory.svg" },
  { group: null, href: "/business-profile", label: "Business Profile", icon: "icon-profile.svg" },
  { group: null, href: "/connections", label: "Connections", icon: "icon-connections.svg" },
  { group: null, href: "/system-users", label: "System Users", icon: "icon-users.svg" },
  { group: null, href: "/customers", label: "Customers & Vehicles", icon: "icon-customers.svg" },
];

export function AppShell({
  title,
  active,
  children,
}: {
  title: string;
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">WORKROO</div>
        <nav className="nav">
          {NAV.map((item) => (
            <div key={item.href} className={item.group ? "nav-group" : undefined}>
              {item.group ? <p className="nav-label">{item.group}</p> : null}
              <Link href={item.href} className={`nav-item${active === item.href ? " active" : ""}`}>
                <img src={`/figma/${item.icon}`} alt="" width={12} height={12} />
                <span>{item.label}</span>
                {item.badge ? <em className="badge">{item.badge}</em> : null}
              </Link>
            </div>
          ))}
        </nav>
        <div className="user-card">
          <div className="avatar">YG</div>
          <div className="user-meta">
            <strong>Yasas Goonetilleke</strong>
            <small>Administrator</small>
          </div>
          <img src="/figma/chevron-right.svg" alt="" width={24} height={24} />
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <h1>{title}</h1>
          <div className="search">
            <img src="/figma/icon-search.svg" alt="" width={12} height={12} />
            Search jobs, customers, vehicles...
          </div>
          <Link href="/job-composer" className="btn-new">
            <img src="/figma/icon-plus.svg" alt="" width={16} height={16} />
            New Job
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
}
