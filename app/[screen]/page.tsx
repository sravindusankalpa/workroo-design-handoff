import { AppShell } from "@/components/AppShell";

const TITLES: Record<string, string> = {
  jobs: "Jobs",
  "quick-job": "Quick Job View",
  "job-templates": "Job Templates",
  invoices: "Invoices",
  "quotation-jobs": "Quotation Jobs",
  "quick-quote": "Quick Quotation View",
  "booking-requests": "Booking Requests",
  inventory: "Inventory",
  "business-profile": "Business Profile",
  connections: "Connections",
  "system-users": "System Users",
  customers: "Customers & Vehicles",
};

export default async function ScreenPage({ params }: { params: Promise<{ screen: string }> }) {
  const { screen } = await params;
  const title = TITLES[screen] ?? screen;
  return (
    <AppShell title={title} active={`/${screen}`}>
      <div className="page">
        <p className="screen-note">
          This nav item is in the Figma sidebar but is not part of the Playground frames (node 4009:912).
          Implemented screens: Sign in, Today’s Overview, Job Schedule, Job Composer.
        </p>
      </div>
    </AppShell>
  );
}
