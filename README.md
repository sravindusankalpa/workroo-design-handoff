# Workroo design handoff + Dev Studio

Pixel HTML/CSS of the Figma playground, plus a **developer studio** where the team selects a component, copies HTML/CSS, and asks questions.

## Run

```bash
cd workroo-design-handoff
npm install
cp .env.example .env.local   # then paste your MongoDB URI
npm run dev
```

- **Component library (default):** http://localhost:3100
- Direct component: http://localhost:3100#job-popover
- Live screens: `/signin`, `/dashboard`, `/job-schedule`, `/job-composer`

## MongoDB

Put your Atlas or local URI in `.env.local`:

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/workroo_design
```

Collections created automatically:

- `components` — name, screen, HTML, CSS, spec notes
- `questions` — team questions on a component (auto-replies from the spec)

If Mongo is down, the studio still runs and stores Q&A in `.data/studio.json`.

## Screens

| Route | What |
| --- | --- |
| `/` | Component library |
| `/signin` | Sign in 5 |
| `/dashboard` | Today's Overview |
| `/job-schedule` | Job Schedule |
| `/job-composer` | Job Composer |
