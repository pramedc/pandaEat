# Supabase Data Viewer

A modern web application built with Next.js, TypeScript, and Tailwind CSS that displays data from Supabase database tables in a beautiful, responsive table format.

## Features

- 📊 **Dynamic Data Tables**: Display data from any Supabase table
- 🔄 **Real-time Refresh**: Refresh data with a single click
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Clean, professional interface with Tailwind CSS
- ⚡ **Fast Loading**: Optimized for performance with Next.js
- 🛡️ **Type Safety**: Full TypeScript support
- 🔧 **Flexible**: Switch between different tables or enter custom table names

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **UI Components**: Custom React components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase project set up
- npm or yarn package manager

### Installation

1. **Clone or download this project**
   ```bash
   cd pandaEat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   To get these values:
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy the Project URL and anon/public key

4. **Set up your Supabase database**

   Create a table with sample data. Here's an example SQL for a `users` table:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     status VARCHAR(20) DEFAULT 'active',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Insert sample data
   INSERT INTO users (name, email, status) VALUES
   ('John Doe', 'john@example.com', 'active'),
   ('Jane Smith', 'jane@example.com', 'inactive'),
   ('Bob Johnson', 'bob@example.com', 'active'),
   ('Alice Brown', 'alice@example.com', 'active');
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Select a table**: Use the dropdown in the header to select from predefined tables or choose "Custom" to enter your own table name
2. **View data**: The table will automatically load and display data from your selected Supabase table
3. **Refresh data**: Click the "Refresh" button to reload the latest data
4. **Responsive viewing**: The table is fully responsive and works on all screen sizes

## Project Structure

```
pandaEat/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main application page
│   │   └── layout.tsx        # App layout
│   ├── components/
│   │   └── DataTable.tsx     # Data table component
│   └── lib/
│       └── supabase.ts       # Supabase client configuration
├── .env.local                # Environment variables (create this)
├── package.json
└── README.md
```

## Customization

### Adding New Table Options

Edit `src/app/page.tsx` and add new options to the select dropdown:

```tsx
<option value="your_table_name">Your Table Name</option>
```

### Modifying Data Display

Edit `src/components/DataTable.tsx` to customize:
- Column formatting
- Data types handling
- Table styling
- Error messages

### Changing the Data Type

Update the `DataRow` interface in `src/lib/supabase.ts` to match your table schema:

```typescript
export interface DataRow {
  id: number
  your_column: string
  another_column: boolean
  // Add your columns here
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Troubleshooting

### Common Issues

1. **"Error loading data" message**
   - Check your Supabase URL and API key
   - Ensure the table name exists in your database
   - Verify your table has data

2. **Empty table display**
   - Make sure your Supabase table has rows
   - Check that the table name matches exactly (case-sensitive)

3. **Environment variables not working**
   - Ensure `.env.local` is in the project root
   - Restart the development server after adding environment variables
   - Check that variable names start with `NEXT_PUBLIC_`

### Getting Help

- Check the Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs

## License

This project is open source and available under the MIT License.# pandaEat
