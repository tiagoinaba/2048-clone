"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function Tile({ number, hasMoved, x, y }) { 
    const [cssPositionClass, setCssPositionClass] = useState(`position-${x}-${y}`)

    useEffect(() => {
        setCssPositionClass(`position-${x}-${y}`)
    }, [x, y])
    
    function getColor(number) {
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
    <div className={`${!hasMoved && 'tile'} ${cssPositionClass} transition-all duration-1000 h-[106px] w-[106px] flex items-center justify-center font-clear-sans font-bold text-5xl ${getColor(number)} rounded-sm`}>
        {number}
    </div>
  )
}
