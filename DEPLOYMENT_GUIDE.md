# LMS Free Deployment Guide

This guide will take you from "Localhost" to a live URL that you can share. We will use 3 free services:
1.  **TiDB Cloud** (or Aiven) for the **MySQL Database**.
2.  **Render** for the **Spring Boot Backend**.
3.  **Vercel** for the **React Frontend**.

---

## Step 1: Database Cloud Setup (TiDB Cloud)
*We need a database that is accessible from the internet, not just your laptop.*

1.  Go to [TiDB Cloud](https://tidbcloud.com/) and Sign Up (Free).
2.  Create a **Serverless Tier** cluster (It's free).
3.  Once created, click **"Connect"** to get your credentials:
    *   **Host**: (e.g., `gateway01.us-west-2.prod.aws.tidbcloud.com`)
    *   **Port**: `4000` (TiDB uses 4000 instead of 3306 usually)
    *   **User**: (e.g., `2.root`)
    *   **Password**: (The one you set)
4.  **Important**: You need to run your `schema.sql` on this new cloud database. You can use a tool like **DBeaver** or the TiDB Cloud SQL Editor to run the SQL commands from `backend/schema.sql`.

---

## Step 2: Deploy Backend (Render)
*Render will build your Java app using the Dockerfile we created.*

1.  Push your code to **GitHub** (if you haven't yet).
2.  Go to [Render.com](https://render.com/) and Sign Up.
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Configuration**:
    *   **Root Directory**: `backend` (Important! Our backend is in a subfolder).
    *   **Runtime**: **Docker**.
    *   **Region**: Closest to you.
    *   **Free Instance Type**: Yes.
6.  **Environment Variables** (Click "Advanced" or "Environment"):
    You must tell the backend how to connect to TiDB instead of localhost.
    *   `SPRING_DATASOURCE_URL`: `jdbc:mysql://<YOUR_TIDB_HOST>:4000/lms_db?sslMode=VERIFY_IDENTITY&useSSL=true`
    *   `SPRING_DATASOURCE_USERNAME`: `<YOUR_TIDB_USER>`
    *   `SPRING_DATASOURCE_PASSWORD`: `<YOUR_TIDB_PASSWORD>`
7.  Click **Create Web Service**.
8.  Wait for it to build. Once done, Render will give you a URL like: `https://lms-backend.onrender.com`. **Copy this URL.**

---

## Step 3: Deploy Frontend (Vercel)
*Vercel is the industry standard for hosting React.*

1.  Go to [Vercel.com](https://vercel.com/) and Sign Up.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Build Settings**:
    *   **Root Directory**: Click "Edit" and select `.` (The root of your repo is fine, or `./` if your package.json is at the top). *Wait... our frontend is at the root `c:/Users/Lenovo/New`, so `.` is correct.*
5.  **Environment Variables**:
    *   Name: `VITE_API_URL`
    *   Value: `https://lms-backend.onrender.com/api` (The URL you got from Render + `/api`).
6.  Click **Deploy**.

---

## 🎉 Done!
Vercel will give you a domain (e.g., `lms-frontend.vercel.app`).
*   Open that URL.
*   The Frontend talks to Render.
*   Render talks to TiDB.
*   **You are live!**
