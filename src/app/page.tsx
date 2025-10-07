'use client'

import { useState } from 'react'
import DataTable from '@/components/DataTable'

export default function Home() {
  const [tableName, setTableName] = useState('users') // Default table name

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PandaEat!</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and manage data from your Supabase database tables
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="table-select" className="text-sm font-medium text-gray-700">
                  Table:
                </label>
                <select
                  id="table-select"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="users">users</option>
                  <option value="user">user</option>
                  <option value="posts">posts</option>
                  <option value="products">products</option>
                  <option value="orders">orders</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Custom table input */}
        {tableName === 'custom' && (
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <label htmlFor="custom-table" className="block text-sm font-medium text-gray-700 mb-2">
                Enter table name:
              </label>
              <input
                id="custom-table"
                type="text"
                placeholder="e.g., customers, inventory, etc."
                onChange={(e) => setTableName(e.target.value)}
                className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Data Table */}
        <DataTable tableName={tableName} />

      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, TypeScript, Tailwind CSS, and Supabase</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
