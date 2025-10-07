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
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <div className="text-red-400 mr-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No data found</h3>
        <p className="text-gray-500">The table &quot;{tableName}&quot; is empty or doesn&apos;t exist.</p>
        <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>
    )
  }

  // Get column headers from the first row
  const columns = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Data from &quot;{tableName}&quot; table
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {data.length} row{data.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleRefresh}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={String(row.id) || index} className="hover:bg-gray-50">
                {columns.map((column) => {
                  const value = row[column]
                  let displayValue = value

                  // Format different data types
                  if (typeof value === 'boolean') {
                    displayValue = value ? 'Yes' : 'No'
                  } else if (column === 'created_at' && typeof value === 'string') {
                    displayValue = new Date(value).toLocaleString()
                  }

                  return (
                    <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={String(displayValue)}>
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
