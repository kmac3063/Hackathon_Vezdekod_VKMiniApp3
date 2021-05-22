import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar} from '@vkontakte/vkui';

const Home = ({id, go, fetchedUser, pos, gyrData}) => {

    const N = 16
    const CELL_WIDTH = 20
    const CELL_HEIGHT = 20
    const USER_WIDTH = CELL_WIDTH / 2
    const USER_HEIGHT = CELL_HEIGHT / 2

    const MAP_WIDTH = N * CELL_WIDTH
    const MAP_HEIGHT = N * CELL_HEIGHT

    const [X, setX] = useState(MAP_WIDTH / 2)
    const [Y, setY] = useState(MAP_HEIGHT / 2)
    const [dX, setdX] = useState(0)
    const [dY, setdY] = useState(0)
    const [d, setD] = useState({a:0, b:0, c:0})

    useEffect(()=>{
        // console.log(2)

        move(pos.x, pos.y)
    }, [pos])

    const contain = (w, a) => {
        return w[0] <= a[0] && a[0] <= w[0] + CELL_WIDTH &&
            w[1] <= a[1] && a[1] <= w[1] + CELL_HEIGHT
    }

    const isValid = (x, y) => {
        const walls = getWalls()
        if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return false

        // x = x - CELL_WIDTH
        // y = y - CELL_HEIGHT
        let a = [x, y]
        let b = [x + USER_WIDTH, y]
        let c = [x, y + USER_HEIGHT]
        let d = [x + USER_WIDTH, y + USER_HEIGHT]


        for (let i = 0; i < walls.length; i++) {
            let w = walls[i]
            if (contain(w, a) || contain(w, b) || contain(w, c) || contain(w, d))
                return false
        }
        return true
    }

    const move = (dx, dy) => {
        let x = X
        let y = Y
        if (x === undefined || isNaN(x)) {
            x = MAP_WIDTH / 2
        }
        if (y === undefined || isNaN(y)) {
            y = MAP_HEIGHT / 2
        }
        console.log(x + " " + y)
        if (isValid(x + dx, y))
            x += dx
        else
            x -= dx
        if (isValid(x,y + dy))
            y += dy
        else
            y -= dy
        console.log(dx + " " + dy)
        setX(x)
        setY(y)
    }


    const getWalls = () => {
        let m = [
            "0000000000000000",
            "0000111111100000",
            "0011100010111110",
            "0010100010100010",
            "0000000010101010",
            "0111111110111010",
            "0010100000101010",
            "0111100111101010",
            "0010100110001010",
            "0010100000001010",
            "0010111111101010",
            "0010000001001010",
            "0110111111001010",
            "0010100000001110",
            "0010111011111000",
            "0000001000000000"]
        let wls = []
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (m[i][j] === '0')
                    wls.push([j * CELL_WIDTH, i * CELL_HEIGHT])
            }
        }
        return wls
    }
    const walls = getWalls()

    return (
        <Panel id={id} style={{backgroundColor: "#AAAAAA"}}>
            <Div style={{margin: "auto", width: "100px", height: "100px", padding: "0px"}}>
            {walls.map((w) => {
                return <Div key={w[0] * 100 + w[1]}
                            style={{position: "fixed",
                                padding:"0",
                                width:CELL_WIDTH, height:CELL_HEIGHT,
                                left: w[0], top: w[1], backgroundColor: "#DDDDDD"}}/>

            })}
            </Div>

            <Div style={{position: "absolute",
                padding:"0",
                width:USER_WIDTH, height:USER_HEIGHT,
                left: X, top: Y,
                backgroundColor: "#000000"}}/>
            <Div>6</Div>
            <Div style={{marginTop:"auto", marginBottom:"0"}}>
                x={gyrData.x}
            </Div>
            <Div>
                y={gyrData.y}
            </Div>
            <Div>
                z={gyrData.z}
            </Div>
        </Panel>
    );
}


export default Home;
