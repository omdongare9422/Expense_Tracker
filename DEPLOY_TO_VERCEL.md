# Deploying to Vercel

Since the Vercel CLI requires authentication, the easiest way to deploy is through the Vercel Dashboard.

## Option 1: Vercel Dashboard (Recommended)

1.  **Go to Vercel**: Open [vercel.com](https://vercel.com) and log in.
2.  **Add New Project**: Click "Add New..." -> "Project".
3.  **Import Git Repository**: Select the `Expense_Tracker` repository you just pushed to GitHub.
4.  **Configure Project**:
    *   **Framework Preset**: Vercel should auto-detect **Astro**.
    *   **Root Directory**: leave as `./`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  **Deploy**: Click **Deploy**.

## Option 2: Vercel CLI (If installed)

Run the following command in your terminal:

```powershell
npx vercel deploy --prod
```

If you are not logged in, it will prompt you to authenticate.
