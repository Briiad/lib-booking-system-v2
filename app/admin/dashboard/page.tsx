'use client'

import React from 'react'
export const dynamic = 'force-dynamic';
const Dashboard = () => {

  const downloadFile = async () => {
    // Get the file from the server
    const response = await fetch('/api/get-csv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Get the file data
    const fileData = await response.blob()
    
    // Create a URL for the file
    const fileURL = URL.createObjectURL(fileData)
    
    // Create an anchor element
    const downloadLink = document.createElement('a')
    downloadLink.href = fileURL
    downloadLink.download = 'data.xlsx'

    // Append the anchor element to the body
    document.body.appendChild(downloadLink)

    // Click the anchor element
    downloadLink.click()

    // Remove the anchor element
    document.body.removeChild(downloadLink)

    // Revoke the object URL
    URL.revokeObjectURL(fileURL)

    // Log the response
    console.log(response)
  }

  return (
    <div>
      {/* Button to download */}
      <button
        onClick={() => {
          // Download the file
          downloadFile()
        }}
      >
        Download
      </button>
    </div>
  )
}

export default Dashboard