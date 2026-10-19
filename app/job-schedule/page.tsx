import { AppShell } from "@/components/AppShell";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Chip = { label: string; accent?: boolean };
type Day = { n: number; muted?: boolean; today?: boolean; chips?: Chip[]; more?: string; popover?: boolean };

const DAYS: Day[] = [
  { n: 30, muted: true },
  { n: 31, muted: true },
  { n: 1 },
  { n: 2 },
  { n: 3 },
  { n: 4 },
  { n: 5 },
  { n: 6 },
  { n: 7 },
  { n: 8, chips: [{ label: "JOB-15972" }] },
  { n: 9 },
  { n: 10, chips: [{ label: "JOB-15978" }, { label: "QVO-1038" }] },
  { n: 11 },
  { n: 12 },
  { n: 13 },
  { n: 14 },
  { n: 15, chips: [{ label: "JOB-15995" }] },
  { n: 16 },
  { n: 17, popover: true },
  { n: 18, chips: [{ label: "JOB-16001", accent: true }, { label: "QVO-1044" }] },
  { n: 19 },
  { n: 20 },
  { n: 21 },
  {
    n: 22,
    today: true,
    chips: [{ label: "JOB-16012" }, { label: "QVO-1048" }],
    more: "+4 more",
  },
  { n: 23 },
  { n: 24 },
  { n: 25 },
  { n: 26 },
  { n: 27 },
  { n: 28 },
  { n: 29 },
  { n: 30 },
  { n: 1, muted: true },
  { n: 2, muted: true },
  { n: 3, muted: true },
];

export default function JobSchedulePage() {
  return (
    <AppShell title="Job Schedule" active="/job-schedule">
      <div className="page">
        <div className="cal-wrap">
          <div className="cal-toolbar">
            <div className="legend">
              <span>Status:</span>
              <span className="legend-item">
                <img src="/figma/dot-todo.svg" alt="" width={7} height={7} /> To Do
              </span>
              <span className="legend-item">
                <img src="/figma/dot-progress.svg" alt="" width={7} height={7} /> In Progress
              </span>
              <span className="legend-item">
                <img src="/figma/dot-review.svg" alt="" width={7} height={7} /> In Review
              </span>
              <span className="legend-item">
                <img src="/figma/dot-done.svg" alt="" width={7} height={7} /> Completed
              </span>
            </div>
            <div className="cal-title">
              <h2>September 2026</h2>
              <p>12 Jobs Listed</p>
            </div>
            <div className="cal-controls">
              <div className="select">
                Month
                <img src="/figma/icon-down.svg" alt="" width={12} height={12} />
              </div>
              <button className="icon-btn" type="button" aria-label="Previous">
                <img src="/figma/icon-left.svg" alt="" width={16} height={16} />
              </button>
              <button className="today-chip" type="button">
                Today
              </button>
              <button className="icon-btn" type="button" aria-label="Next">
                <img src="/figma/icon-right.svg" alt="" width={16} height={16} />
              </button>
            </div>
          </div>
          <div className="weekdays">
            {WEEKDAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="week" style={{ gridTemplateRows: "repeat(5, minmax(116px, auto))" }}>
            {DAYS.map((day, i) => (
              <div key={`${day.n}-${i}`} className={`day${day.muted ? " muted" : ""}${day.today ? " today" : ""}`}>
                {day.today ? <span className="today-tag">TODAY</span> : null}
                <div className="day-num">{day.n}</div>
                {day.chips?.map((chip) => (
                  <div key={chip.label} className={`chip${chip.accent ? " accent" : ""}`}>
                    <img src="/figma/dot-todo.svg" alt="" width={7} height={7} />
                    {chip.label}
                  </div>
                ))}
                {day.more ? <div className="more">{day.more}</div> : null}
                {day.popover ? (
                  <aside className="popover">
                    <h3>JOB-16009 · Service</h3>
                    <dl>
                      <dt>Customer</dt>
                      <dd>Charith</dd>
                      <dt>Phone</dt>
                      <dd>0425 164 118</dd>
                      <dt>Status</dt>
                      <dd>In Progress</dd>
                      <dt>Start date</dt>
                      <dd>22 Sep 2026</dd>
                    </dl>
                    <hr />
                    <dl>
                      <dt>Expected delivery</dt>
                      <dd>25 Sep 2026</dd>
                    </dl>
                  </aside>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
