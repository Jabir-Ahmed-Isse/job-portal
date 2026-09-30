# job-portal
job portal web Application for job seekers and companies

## Running locally

Requires Node.js 20+.

1. Install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. Create `server/.env` and `client/.env` from the `.env.example` files next to them.
3. Start a local MongoDB (no install needed; data is kept in `server/.mongo-data`):
   ```bash
   cd server && npm run db
   ```
   To use MongoDB Atlas instead, set `MONGODB_URI` to your cluster's connection string and skip this step.
4. Load demo data (companies, jobs, applicants):
   ```bash
   cd server && npm run seed
   ```
   Demo company login: `somtel@demo.test` / `demo1234`
5. Start the API and the web app in two terminals:
   ```bash
   cd server && npm start
   ```
   ```bash
   cd client && npm run dev
   ```
   Open http://localhost:5173

## Screenshots

### Home page
![Home page](screenshots/home.png)

### Job listings
![Job listings](screenshots/job-listings.png)

### Job details
![Job details](screenshots/job-details.png)

### Company login
![Company login](screenshots/company-login.png)

### Company dashboard
![Company dashboard](screenshots/dashboard.png)

### Add a job
![Add a job](screenshots/add-job.png)

### Manage jobs
![Manage jobs](screenshots/manage-jobs.png)

### View applications
![View applications](screenshots/view-applications.png)

### Mobile view
<img src="screenshots/home-mobile.png" alt="Mobile view" width="320">

### Full home page
![Full home page](screenshots/home-full.png)
