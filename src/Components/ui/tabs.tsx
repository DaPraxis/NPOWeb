'use client'
import React from 'react'

interface TabsProps {
  tabs: string[]
  current: string
  onChange: (tab: string) => void
}

export const Tabs = ({ tabs, current, onChange }: TabsProps) => {
  return (
    <div className="flex space-x-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`py-2 px-4 font-medium transition ${
            tab === current
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
