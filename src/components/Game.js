'use client'

import React, { useEffect, useRef, useState } from 'react'
import Row from './Row'

export default function Game() {
    const [rows, setRows] = useState({
        firstRow: [{}, {}, {}, {}],
        secondRow: [{}, {}, {}, {}],
        thirdRow: [{}, {}, {}, {}],
        fourthRow: [{}, {}, {}, {}]
    })
    const rowsRef = useRef()
    rowsRef.current = rows

    const [isGridFull, setIsGridFull] = useState(false)
    const gridFullRef = useRef()
    gridFullRef.current = isGridFull

    const [shouldGetNewTile, setShouldGetNewTile] = useState(false)

    useEffect(() => {
        if(shouldGetNewTile) {
            generateTile()
            setShouldGetNewTile(false)
        }
    }, [shouldGetNewTile])
    
    useEffect(() => {
        setIsGridFull(checkIfGridIsFull)
    }, [rows])
    
    useEffect(() => {
        window.addEventListener('keydown', e => {
            handleKeyDown(e)
        })
        startGame()
    }, [])
    
    function checkIfGridIsFull() {
        const keys = Object.keys(rows)
        
        for(let key of keys) {
            for(let i = 0; i < rows[key].length; i++) {
                if(!rows[key][i].value) {
                    return false
                }
            }
        }
        
        return true
    }

    function areObjectsEqual(obj1, obj2) {
        const obj1Keys = Object.keys(obj1)
        let returnBool = true

        obj1Keys.forEach(key => {
            const currentRow = obj1[key]

            currentRow.forEach(tile => {
                const tileIndex = currentRow.indexOf(tile)
                if(tile.value !== obj2[key][tileIndex].value) {
                    returnBool = false
                }
            })
        })
        return returnBool
    }

    function handleKeyDown(e) {
        if(e.key === "ArrowLeft") {
            setRows(prev => {
                const prevRows = [prev.firstRow, prev.secondRow, prev.thirdRow, prev.fourthRow]
                let updatedRows = {}

                prevRows.forEach(row => {
                    let filledTiles = row.filter(tile => {
                        if(tile.hasOwnProperty("value")) {
                            tile.prevX = row.indexOf(tile)
                            tile.prevY = null
                        }
                        return Object.keys(tile).length > 0
                    })

                    filledTiles = filledTiles.map(tile => {
                        return {...tile, hasMoved: true, x: filledTiles.indexOf(tile)}
                    })

                    if(filledTiles.length > 1) {
                        for(let i=0; i < filledTiles.length - 1; i++) {
                            const tile = filledTiles[i]
                            if(tile.value === filledTiles[i + 1].value) {
                                filledTiles.splice(i, 2, {
                                    value: (tile.value * 2),
                                    hasMoved: true,
                                    x: i
                                })
                            }
                        }
                    }
                    
                    for(let i = 0, length = filledTiles.length; i < 4 - length; i++) {
                        filledTiles.push({})
                    }


                    const rowIndex = prevRows.indexOf(row)
                    updatedRows = {
                        ...updatedRows,
                        [rowIndex === 0 ? 'firstRow' : rowIndex === 1 ? 'secondRow' : rowIndex === 2 ? 'thirdRow' : 'fourthRow']: filledTiles
                    }
                })
                
                if(areObjectsEqual(prev, updatedRows)) {
                    setShouldGetNewTile(false)
                } else {
                    setShouldGetNewTile(true)
                }

                return updatedRows
            })
        }

        if(e.key === "ArrowRight") {
            setRows(prev => {
                const prevRows = [prev.firstRow, prev.secondRow, prev.thirdRow, prev.fourthRow]
                let updatedRows = {}

                prevRows.forEach(row => {
                    let filledTiles = row.filter(tile => {
                        if(tile.hasOwnProperty("value")) {
                            tile.prevX = row.indexOf(tile)
                            tile.prevY = null
                        }
                        return Object.keys(tile).length > 0
                    })

                    filledTiles = filledTiles.map(tile => {
                        return {...tile, hasMoved: true, x: 4 - filledTiles.length + filledTiles.indexOf(tile)}
                    })

                    if(filledTiles.length > 1) {
                        for(let i=filledTiles.length - 1; i > 0; i--) {
                            const tile = filledTiles[i]
                            if(tile.value === filledTiles[i - 1].value) {
                                filledTiles.splice(i - 1, 2, {
                                    value: (tile.value * 2),
                                    hasMoved: true,
                                    x: 4 - filledTiles.length + i - 1
                                })
                                i-=1
                            }
                        }
                    }
                    
                    for(let i = 0, length = filledTiles.length; i < 4 - length; i++) {
                        filledTiles.unshift({})
                    }


                    const rowIndex = prevRows.indexOf(row)
                    updatedRows = {
                        ...updatedRows,
                        [rowIndex === 0 ? 'firstRow' : rowIndex === 1 ? 'secondRow' : rowIndex === 2 ? 'thirdRow' : 'fourthRow']: filledTiles
                    }
                })
                if(areObjectsEqual(prev, updatedRows)) {
                    setShouldGetNewTile(false)
                } else {
                    setShouldGetNewTile(true)
                }
                return updatedRows
            })
        }

        if(e.key === "ArrowDown") {
            setRows(prev => {
                const prevRows = [prev.firstRow, prev.secondRow, prev.thirdRow, prev.fourthRow]
                const prevColumns = [[], [], [], []]
                const updatedColumns = []
                const newRows = [[], [], [], []]
                let updatedRows = {}
                
                prevRows.forEach(row => {
                    row.forEach(tile => {
                        prevColumns[row.indexOf(tile)].push(tile)
                    })
                })
                
                prevColumns.forEach(column => {
                    let filledTiles = column.filter(tile => {
                        if(tile.hasOwnProperty("value")) {
                            tile.prevY = column.indexOf(tile)
                            tile.prevX = null
                        }
                        return Object.keys(tile).length > 0
                    })

                    filledTiles = filledTiles.map(tile => {
                        return {...tile, hasMoved: true, y: 4 - filledTiles.length + filledTiles.indexOf(tile)}
                    })
                    
                    if(filledTiles.length > 1) {
                        for(let i=filledTiles.length - 1; i > 0; i--) {
                            const tile = filledTiles[i]
                            if(tile.value === filledTiles[i - 1].value) {
                                filledTiles.splice(i - 1, 2, {
                                    value: (tile.value * 2),
                                    hasMoved: true,
                                    y: 4 - filledTiles.length + i - 1
                                })
                                i-=1
                            }
                        }
                    }

                    for(let i = 0, length = filledTiles.length; i < 4 - length; i++) {
                        filledTiles.unshift({})
                    }

                    updatedColumns.push(filledTiles)
                })

                updatedColumns.forEach(column => {
                    column.forEach(tile => {
                        newRows[column.indexOf(tile)].push(tile)
                    })
                })

                newRows.forEach(row => {
                    const rowIndex = newRows.indexOf(row)
                    updatedRows = {
                        ...updatedRows,
                        [rowIndex === 0 ? 'firstRow' : rowIndex === 1 ? 'secondRow' : rowIndex === 2 ? 'thirdRow' : 'fourthRow']: row
                    }
                })
                if(areObjectsEqual(prev, updatedRows)) {
                    setShouldGetNewTile(false)
                } else {
                    setShouldGetNewTile(true)
                }
                return updatedRows
            })
        }

        if(e.key === "ArrowUp") {
            setRows(prev => {
                const prevRows = [prev.firstRow, prev.secondRow, prev.thirdRow, prev.fourthRow]
                const prevColumns = [[], [], [], []]
                const updatedColumns = []
                const newRows = [[], [], [], []]
                let updatedRows = {}

                prevRows.forEach(row => {
                    row.forEach(tile => {
                        prevColumns[row.indexOf(tile)].push(tile)
                    })
                })
                
                prevColumns.forEach(column => {
                    let filledTiles = column.filter(tile => {
                        if(tile.hasOwnProperty("value")) {
                            tile.prevY = column.indexOf(tile)
                            tile.prevX = null
                        }
                        return Object.keys(tile).length > 0
                    })

                    filledTiles = filledTiles.map(tile => {
                        return {...tile, hasMoved: true, y: filledTiles.indexOf(tile)}
                    })

                    if(filledTiles.length > 1) {
                        for(let i=0; i < filledTiles.length - 1; i++) {
                            const tile = filledTiles[i]
                            if(tile.value === filledTiles[i + 1].value) {
                                filledTiles.splice(i, 2, {
                                    ...tile,
                                    value: (tile.value * 2),
                                    x: i
                                })
                            }
                        }
                    }

                    for(let i = 0, length = filledTiles.length; i < 4 - length; i++) {
                        filledTiles.push({})
                    }

                    updatedColumns.push(filledTiles)
                })

                updatedColumns.forEach(column => {
                    column.forEach(tile => {
                        newRows[column.indexOf(tile)].push(tile)
                    })
                })

                newRows.forEach(row => {
                    const rowIndex = newRows.indexOf(row)
                    updatedRows = {
                        ...updatedRows,
                        [rowIndex === 0 ? 'firstRow' : rowIndex === 1 ? 'secondRow' : rowIndex === 2 ? 'thirdRow' : 'fourthRow']: row
                    }
                })

                // if(areRowsEqual(prevRows, updatedRows)) {
                //     console.log('equal')
                //     setShouldGetNewTile(false)
                //     return updatedRows
                // } else {
                //     console.log('not equal')
                //     setShouldGetNewTile(true)
                //     return updatedRows
                // }
                
                if(areObjectsEqual(prev, updatedRows)) {
                    setShouldGetNewTile(false)
                } else {
                    setShouldGetNewTile(true)
                }
                return updatedRows
            })
        }
        
        
    }

    // function areRowsEqual(prevRows, updRows) {
    //     const keys1 = Object.keys(prevRows)
    //     const keys2 = Object.keys(updRows)

    //     for(let key of keys1) {
    //         prevRows[key].forEach(obj => {
    //             const objKeys = Object.keys(obj)
    //             const obj2 = updRows[key][prevRows[key].indexOf(obj)]
    //             const obj2Keys = Object.keys(obj2)

    //             if(objKeys.length !== obj2Keys.length) {
    //                 return false
    //             }

    //             for(let i of objKeys) {
    //                 if(obj[i].value !== obj2[i]) {
    //                     return false
    //                 }
    //             }

    //             return true
    //         })
    //     }
    // }

    function startGame() {
        setRows({
            firstRow: [{}, {}, {}, {}],
            secondRow: [{}, {}, {}, {}],
            thirdRow: [{}, {}, {}, {}],
            fourthRow: [{}, {}, {}, {}]
        })

        setIsGridFull(false)

        generateTile()
        generateTile()
    }

    function generateTile() {
        if(!gridFullRef.current) {
            // decide random tile value
            const twoOrFour = Math.floor(Math.random() * 9) < 8 ? 2 : 4
    
            // get random row
            const randomRow = Math.floor(Math.random() * 4)
    
            // const randomRowName = randomRow === 0 ? "firstRow" : randomRow === 1 ? "secondRow" : randomRow === 2 ? "thirdRow" : "fourthRow"
    
            // get random row name
            const randomRowName = Object.keys(rowsRef.current)[randomRow]
    
            //get random column
            const randomCol = Math.floor(Math.random() * 4)
    
    
            // check if random tile is empty
            if(Object.keys(rowsRef.current[randomRowName][randomCol]).length > 0) {
    
                // if not, run function again
                generateTile()
    
            } else {
                setRows(prev => {
                    const prevRowArr = prev[randomRowName]
                    // replace empty tile with our new tile
                    prevRowArr.splice(randomCol, 1, {
                        value: twoOrFour,
                        hasMoved: false,
                        x: randomCol,
                        y: randomRow
                    })
    
                    return {
                        ...prev,
                        [randomRowName]: prevRowArr
                    }
                })
            }
        }
    }

  return (
    <div className='w-[500px] h-[500px] bg-basic text-text rounded-lg p-[15px] flex flex-col gap-[15px] relative'>
        <Row rows={rows} row={"firstRow"} />
        <Row rows={rows} row={"secondRow"} />
        <Row rows={rows} row={"thirdRow"} />
        <Row rows={rows} row={"fourthRow"} />
    </div>
  )
}
