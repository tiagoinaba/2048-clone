import React, { useEffect, useRef, useState } from 'react'

export default function Tile({ number, hasMoved, x, y, prevX, prevY }) { 

    function moveTile() {
        let className = ""
        if(hasMoved && prevX || hasMoved && prevX === 0) {
            className = `moveX-${prevX}-${x}`
        }
        
        if(hasMoved && prevY || hasMoved && prevY === 0) {
            className = `moveY-${prevY}-${y}`
        }

        return className
    }
    
    function getColor() {
        let backgroundColor = number === 2 ? 'two' : 
                                number === 4 ? 'four' : 
                                number === 8 ? 'eight' :
                                number === 16 ? 'sixteen' :
                                number === 32 ? 'thirty-two' :
                                number === 64 ? 'sixty-four' :
                                number === 128 ? 'one-two-eight' :
                                number === 256 ? 'two-five-six' :
                                number === 512 ? 'five-one-two' :
                                number === 1024 ? 'ten-two-four' : 'twenty-four-eight'

        if (number > 4) {
            backgroundColor = backgroundColor + ' white-text'
        }
        
        return backgroundColor
    }

  return (
    <div className={`${!hasMoved && 'tile'} ${moveTile()} transition-all duration-1000 h-[106px] w-[106px] flex items-center justify-center font-clear-sans font-bold text-5xl ${getColor()} rounded-sm`}>
        {number}
    </div>
  )
}
