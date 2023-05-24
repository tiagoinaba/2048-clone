import React from 'react'

export default function MergedTile({ number, x, mergedX, y, mergedY }) {
    function moveTile(prev) {
        let className = ""
        if(mergedX) {
            className = `moveX-${prev}-${x}`
        }
        
        if(mergedY) {
            className = `moveY-${prev}-${y}`
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
    <div className='relative flex'>
        {
            mergedY && 
            <div className={`${moveTile(mergedY[0])} absolute -translate-y-[106px] -z-10 transition-all duration-1000 h-[106px] w-[106px] flex items-center justify-center font-bold text-5xl ${getColor()} rounded-sm`}>
                {number}
            </div>
        }
        {
            mergedY && 
            <div className={`${moveTile(mergedY[1])} absolute -translate-y-[106px] -z-10 transition-all duration-1000 h-[106px] w-[106px] flex items-center justify-center font-bold text-5xl ${getColor()} rounded-sm`}>
                {number}
            </div>
        }
        {
            mergedX && 
            <div className={`${moveTile(mergedX[0])} absolute -translate-y-[106px] -z-10 transition-all duration-1000 h-[106px] w-[106px] flex items-center justify-center font-bold text-5xl ${getColor()} rounded-sm`}>
                {number}
            </div>
        }
        {
            mergedX && 
            <div className={`${moveTile(mergedX[1])} absolute -translate-y-[106px] -z-10 transition-all duration-1000 h-[106px] w-[106px] flex items-center justify-center font-bold text-5xl ${getColor()} rounded-sm`}>
                {number}
            </div>
        }
    </div>
  )
}
