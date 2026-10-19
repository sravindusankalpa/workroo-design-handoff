import { AppShell } from "@/components/AppShell";

function Pill({ kind, children }: { kind: string; children: string }) {
  return <div className={`pill ${kind}`}>{children}</div>;
}

export default function DashboardPage() {
  return (
    <AppShell title="Today’s Overview" active="/dashboard">
      <div className="page">
        <div className="stats pad">
          <article className="stat-card">
            <div className="stat-head todo">To Do</div>
            <div className="stat-metrics">
              <div className="metric">
                <label>Service jobs</label>
                <strong>4</strong>
              </div>
              <div className="metric">
                <label>Quotes</label>
                <strong>2</strong>
              </div>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-head progress">In Progress</div>
            <div className="stat-metrics">
              <div className="metric">
                <label>Service jobs</label>
                <strong>7</strong>
              </div>
              <div className="metric">
                <label>Quotes</label>
                <strong>3</strong>
              </div>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-head review">In Review</div>
            <div className="stat-metrics">
              <div className="metric">
                <label>Service jobs</label>
                <strong>7</strong>
              </div>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-head done">Completed</div>
            <div className="stat-metrics">
              <div className="metric">
                <label>Service jobs</label>
                <strong>20</strong>
              </div>
              <div className="metric">
                <label>Quotes</label>
                <strong>20</strong>
              </div>
            </div>
          </article>
          <article className="stat-card">
            <div className="stat-head pay">Pending Payments</div>
            <div className="stat-metrics">
              <div className="metric bare">
                <label>from 16 invoices</label>
                <strong>$ 12,590.00</strong>
              </div>
            </div>
          </article>
        </div>

        <div className="panels">
          <section className="card">
            <div className="card-head">
              <h2>Jobs in Today</h2>
              <a href="#jobs">View Details</a>
            </div>
            {[
              ["JOB-16012", "Service & Repair", "Pabudu", "0430 458 334", "todo", "To Do"],
              ["QVO-1048", "Quotation", "Samin", "0468 183 922", "progress", "In Progress"],
              ["JOB-16009", "Service & Repair", "Charith", "0425 164 118", "progress", "In Progress"],
              ["JOB-16005", "Service & Repair", "Praveen", "0427 297 501", "review", "In Review"],
            ].map((row) => (
              <div className="row" key={row[0]}>
                <div className="job-id">
                  <strong>{row[0]}</strong>
                  <small>{row[1]}</small>
                </div>
                <div className="cell grow">{row[2]}</div>
                <div className="cell phone">{row[3]}</div>
                <Pill kind={row[4]}>{row[5]}</Pill>
              </div>
            ))}
          </section>

          <section className="card">
            <div className="card-head">
              <h2>Mechanics Working Today</h2>
              <a href="#mechanics">View Details</a>
            </div>
            <div className="row">
              <div className="mechanic">
                <div className="avatar muted">RE</div>
                <div className="job-id" style={{ width: "auto" }}>
                  <strong>Randula</strong>
                  <small>JOB-16012</small>
                </div>
              </div>
              <div className="cell grow">
                Initial vehicle inspection
                <div style={{ color: "#667085", fontSize: 9, marginTop: 3 }}>-</div>
              </div>
              <Pill kind="todo">To Do</Pill>
            </div>
            <div className="row">
              <div className="mechanic">
                <div className="avatar muted">YG</div>
                <div className="job-id" style={{ width: "auto" }}>
                  <strong>Yasas</strong>
                  <small>JOB-16009</small>
                </div>
              </div>
              <div className="cell grow">
                Brake pad replacement
                <span className="hours">1.5 h spent</span>
              </div>
              <Pill kind="progress">In Progress</Pill>
            </div>
            <div className="row">
              <div className="mechanic">
                <div className="avatar muted">CH</div>
                <div className="job-id" style={{ width: "auto" }}>
                  <strong>Charith</strong>
                  <small>JOB-16005</small>
                </div>
              </div>
              <div className="cell grow">
                Final quality check
                <span className="hours">0.8 h spent</span>
              </div>
              <Pill kind="review">In Review</Pill>
            </div>
          </section>
        </div>

        <div className="panels">
          <section className="card">
            <div className="card-head">
              <h2>Last 10 Invoices</h2>
              <a href="#invoices">View Details</a>
            </div>
            <div className="table-head">
              <span className="w165">Job</span>
              <span className="grow">Job</span>
              <span className="grow">Vehicle</span>
              <span className="amt">Amount $</span>
              <span className="w110">Status</span>
            </div>
            <div className="row" style={{ gap: 20 }}>
              <div className="job-id">
                <strong>6-0432</strong>
                <small>Job ID: JOB-16012</small>
              </div>
              <div className="cell grow">Pabudu</div>
              <div className="cell grow">1RGC</div>
              <div className="cell amt">1,431.42</div>
              <Pill kind="draft">Draft</Pill>
            </div>
            <div className="row" style={{ gap: 20 }}>
              <div className="job-id">
                <strong>QVO-1048</strong>
                <small>Job ID: QVO-1048</small>
              </div>
              <div className="cell grow">Samin</div>
              <div className="cell grow">VAG984</div>
              <div className="cell amt">431.42</div>
              <Pill kind="progress">Pending Payment</Pill>
            </div>
            <div className="row" style={{ gap: 20 }}>
              <div className="job-id">
                <strong>JOB-16009</strong>
                <small>Job ID: JOB-16012</small>
              </div>
              <div className="cell grow">Charith</div>
              <div className="cell grow">DMT017</div>
              <div className="cell amt">15,331.42</div>
              <Pill kind="paid">Paid</Pill>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
