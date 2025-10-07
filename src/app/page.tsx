'use client'

import { useState } from 'react'
import DataTable from '@/components/DataTable'

export default function Home() {
  const [tableName, setTableName] = useState('users') // Default table name

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">🐼</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PandaEat!
                </h1>
                <p className="mt-2 text-sm text-gray-600 font-medium">
                  📊 Your database data at your fingertips
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white rounded-xl px-4 py-3 shadow-md border border-gray-200/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <label htmlFor="table-select" className="text-sm font-semibold text-gray-700">
                  Database Table:
                </label>
                <select
                  id="table-select"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="border-0 bg-transparent text-sm font-medium text-gray-800 focus:outline-none focus:ring-0 cursor-pointer"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Custom table input */}
        {tableName === 'custom' && (
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚙️</span>
                </div>
                <label htmlFor="custom-table" className="text-lg font-semibold text-gray-800">
                  Custom Table Name
                </label>
              </div>
              <input
                id="custom-table"
                type="text"
                placeholder="e.g., customers, inventory, transactions..."
                onChange={(e) => setTableName(e.target.value)}
                className="w-full max-w-lg border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
              />
              <p className="mt-3 text-sm text-gray-500">
                💡 Enter the exact name of your database table
              </p>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <DataTable tableName={tableName} />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚀</span>
              <p className="text-lg font-semibold text-gray-700">
                Powered by Modern Technology
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Next.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Database</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Made with ❤️ for data lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
