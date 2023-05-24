import React from 'react'
import Tile from './Tile'
import MergedTile from './MergedTile'

export default function Cell({ row, value }) {

  return (
    <div className='width-1 h-[106px] bg-empty flex-1 rounded-sm'>
        {value.value && <Tile number={value.value} hasMoved={value.hasMoved} x={value.x} y={value.y} prevX={value.prevX} prevY={value.prevY} mergedX={value.mergedX} mergedY={value.mergedY} />}
        {value.mergedY && <MergedTile number={(value.value) / 2} y={value.y} mergedY={value.mergedY} />}
        {value.mergedX && <MergedTile number={(value.value) / 2} x={value.x} mergedX={value.mergedX} />}
    </div>
  )
}
