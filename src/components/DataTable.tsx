'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, DataRow } from '@/lib/supabase'

interface DataTableProps {
  tableName: string
}

export default function DataTable({ tableName }: DataTableProps) {
  const [data, setData] = useState<DataRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data: tableData, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('id', { ascending: true })

      if (fetchError) {
        throw fetchError
      }

      console.log(`Fetched data from ${tableName}:`, tableData)
      setData(tableData || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [tableName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleRefresh = () => {
    fetchData()
  }

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-gray-200/50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">Loading your data...</p>
            <p className="text-sm text-gray-500 mt-1">Fetching from database</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-200/50">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-gray-200/50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Data Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The table &quot;{tableName}&quot; is empty or doesn&apos;t exist in your database.
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>
    )
  }

  // Get column headers from the first row
  const columns = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {tableName} Table
              </h2>
              <p className="text-sm text-gray-600">
                Live data from your database
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200/50">
              <span className="text-sm font-semibold text-gray-700">
                {data.length} row{data.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/50">
          <thead className="bg-gradient-to-r from-gray-50/80 to-blue-50/80">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{column.replace(/_/g, ' ')}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-200/30">
            {data.map((row, index) => (
              <tr key={String(row.id) || index} className="hover:bg-blue-50/50 transition-colors duration-200">
                {columns.map((column) => {
                  const value = row[column]
                  let displayValue = value

                  // Format different data types
                  if (typeof value === 'boolean') {
                    displayValue = value ? '✅ Yes' : '❌ No'
                  } else if (column === 'created_at' && typeof value === 'string') {
                    displayValue = new Date(value).toLocaleString()
                  }

                  return (
                    <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      <div className="max-w-xs truncate font-medium" title={String(displayValue)}>
                        {String(displayValue)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
