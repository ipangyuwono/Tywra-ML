# Supabase Setup Instructions

## Steps to configure Supabase database:

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - Project name: `tywra-ml` (or your choice)
   - Database password: (create a strong password)
   - Region: Choose closest to your location
5. Click "Create new project" and wait for setup to complete

### 2. Get API Credentials
1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Click "API" in the left sidebar
3. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### 3. Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Create Database Table
1. In Supabase dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Open `supabase-migration.sql` file from your project
4. Copy all SQL code and paste it into the SQL Editor
5. Click "Run" button to execute the migration
6. Verify the table was created by going to "Table Editor" → you should see "try-api" table

### 5. Verify Data
1. Go to "Table Editor" in Supabase dashboard
2. Click on "try-api" table
3. You should see 3 rows of sample data (Alun-Alun Brebes, Semarang, Bandung)

### 6. Test API
1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```
2. Test the endpoints:
   - Get all blogs: `http://localhost:3000/api/blogs`
   - Get single blog: `http://localhost:3000/api/blog/1`

## Troubleshooting

- **Connection error**: Verify your URL and API key in `.env.local`
- **Table not found**: Make sure you ran the SQL migration
- **No data returned**: Check Row Level Security policies are set correctly
- **CORS errors**: The anon key should work for public read access

## Files Modified
- ✅ `lib/supabase.ts` - Supabase client configuration
- ✅ `.env.local` - Environment variables (update with your credentials)
- ✅ `app/api/blogs/route.ts` - Fetch all blogs from Supabase
- ✅ `app/api/blog/[id]/route.ts` - Fetch single blog by ID from Supabase
- ✅ `supabase-migration.sql` - SQL script to create table and insert data
