import React from 'react'
import Tile from './Tile'

export default function Cell({ row, value }) {

  return (
    <div className='width-1 h-[106px] bg-empty flex-1 rounded-sm'>
        {value.value && <Tile number={value.value} hasMoved={value.hasMoved} x={value.x} y={value.y} prevX={value.prevX} prevY={value.prevY} />}
    </div>
  )
}
