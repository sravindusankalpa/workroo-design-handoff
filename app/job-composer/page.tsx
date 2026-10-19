import { AppShell } from "@/components/AppShell";

export default function JobComposerPage() {
  return (
    <AppShell title="Job Composer" active="/job-composer">
      <div className="page">
        <div className="composer">
          <aside className="customer-col">
            <div className="box">
              <h3>Search Customer</h3>
              <div className="control">Name | Vehicle Reg. No</div>
              <div className="empty-customer">
                No customer attached to the job.
                <a href="#add">Add New Customer Or Vehicle</a>
              </div>
            </div>
          </aside>
          <div className="job-col">
            <div className="composer-actions">
              <button className="btn-ghost" type="button">
                Save Draft
              </button>
              <button className="btn-primary" type="button">
                Create Job
              </button>
            </div>
            <section className="section">
              <div className="section-head">JOB DETAILS</div>
              <div className="section-body">
                <div className="two">
                  <div className="col">
                    <div>
                      <div className="flabel">
                        Job Type <span className="req">*</span>
                      </div>
                      <div className="radios">
                        <div className="radio on">
                          <img src="/figma/icon-radio.svg" alt="" width={13} height={13} />
                          Service &amp; Repair
                        </div>
                        <div className="radio">
                          <span className="dot" />
                          Quotation
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flabel">
                        Inspected By <span className="req">*</span>
                      </div>
                      <div className="control">
                        -Select Mechanic-
                        <img src="/figma/icon-select.svg" alt="" width={12} height={12} />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flabel">Job Description</div>
                    <div className="control area">Add a brief job description</div>
                    <div className="hint">
                      <span>Max 160 characters</span>
                      <span>0/160</span>
                    </div>
                  </div>
                </div>
                <div className="two">
                  <div className="col">
                    <div className="two">
                      <div className="col">
                        <div className="flabel">
                          Drop-off Time <span className="req">*</span>
                        </div>
                        <div className="dt">
                          <div className="control">22 Sep 2026</div>
                          <div className="control time">08:00</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="flabel">Pick-up Time</div>
                        <div className="dt">
                          <div className="control">Select date</div>
                          <div className="control time">--:--</div>
                        </div>
                      </div>
                    </div>
                    <div className="two">
                      <div className="col">
                        <div className="flabel">Odometer Value</div>
                        <div className="control">0</div>
                      </div>
                      <div className="col">
                        <div className="flabel">Estimated Job Effort (Hours)</div>
                        <div className="control">0</div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flabel">Customer Note</div>
                    <div className="control area">Add customer notes</div>
                    <div className="hint">
                      <span>Max 120 characters</span>
                      <span>0/160</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="section-head plain">
                TASK DETAILS
                <div style={{ display: "flex", gap: 7 }}>
                  <button className="btn-sm solid" type="button">
                    Import Template
                  </button>
                  <button className="btn-sm outline" type="button">
                    Add Task
                  </button>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="section-head plain">
                HELP CONTENT
                <button className="btn-sm outline" type="button">
                  Add New File
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
