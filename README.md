# NestVT — UVM Student Housing Platform

A college student housing platform for University of Vermont (UVM) students in Burlington, Vermont. Built as an investor-pitch MVP for an entrepreneurship class.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (utility-first, mobile-first)
- **lucide-react** for icons
- **next-themes** for light/dark mode
- **clsx + tailwind-merge** for class merging

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Deploy to Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click "Deploy"
5. Done! Your site is live.

## Project Structure

```
nestvt/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with nav + theme
│   ├── globals.css         # Global styles + CSS tokens
│   ├── page.tsx            # Home page
│   ├── listings/           # Browse + detail pages
│   ├── packages/           # Packages + checkout pages
│   ├── student/            # Student dashboard + bookings
│   ├── for-landlords/      # Landlord marketing + submit
│   └── landlord/           # Landlord dashboard
├── components/             # 13 reusable components
├── lib/
│   ├── cn.ts               # Class name utility
│   └── mock-data.ts        # All mock data (no DB needed)
└── public/                 # Static assets
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home: hero, listings, packages, testimonials |
| `/listings` | Browse with filters (price, beds, type, distance) |
| `/listings/[slug]` | Listing detail with gallery, reviews, CTA |
| `/packages` | Package comparison + add-ons + group discount |
| `/packages/checkout` | Order form + success screen |
| `/student/dashboard` | Student welcome, bookings, tours |
| `/student/bookings/[id]` | Booking detail with status timeline |
| `/for-landlords` | Landlord marketing page |
| `/for-landlords/submit` | Multi-step listing submission |
| `/landlord/dashboard` | Landlord listings, tours, stats |

## Fee Model

| Package | Price | Includes |
|---------|-------|----------|
| Base | $199 | Curated listings + 1 tour + coordinator contact |
| Premium | $349 | Base + lease review + inspection + 2 tours + priority |

**Add-ons:** Extra Tour +$49 | Emergency Lease Review +$89 | Parent Consultation +$59

**Group Discounts:** 3 students = 8% | 4 students = 10% | 5 students = 12%

## Notes

- No real authentication — uses a mock `DEMO_STUDENT` session
- No real payments — checkout confirms and shows "A coordinator will contact you within 24 hours"
- All data lives in `lib/mock-data.ts`
- Zero external services required — runs fully offline
