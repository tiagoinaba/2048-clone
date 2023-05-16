import React from 'react'
import Cell from './Cell'

export default function Row({ rows, row }) {
  const thisRow = rows[row]

  return (
    <div className='flex justify-around gap-[15px]'>
        <Cell row={thisRow} value={thisRow[0]} />
        <Cell row={thisRow} value={thisRow[1]} />
        <Cell row={thisRow} value={thisRow[2]} />
        <Cell row={thisRow} value={thisRow[3]} />
    </div>
  )
}
