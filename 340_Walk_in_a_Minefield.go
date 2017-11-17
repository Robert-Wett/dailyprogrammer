package main

import (
	"fmt"
	"strings"
)
/*
PLAYGROUND LINK: https://play.golang.org/p/b2sDVwJ7lo

Description
You must remotely send a sequence of orders to a robot to get it out of a minefield.

You win the game when the order sequence allows the robot to get out of the minefield without touching any mine. Otherwise it returns the position of the mine that destroyed it.

A mine field is a grid, consisting of ASCII characters like the following:

+++++++++++++
+000000000000
+0000000*000+
+00000000000+
+00000000*00+
+00000000000+
M00000000000+
+++++++++++++
The mines are represented by * and the robot by M.

The orders understandable by the robot are as follows:

N moves the robot one square to the north
S moves the robot one square to the south
E moves the robot one square to the east
O moves the robot one square to the west
I start the the engine of the robot
- cuts the engine of the robot
If one tries to move it to a square occupied by a wall +, then the robot stays in place.

If the robot is not started (I) then the commands are inoperative. It is possible to stop it or to start it as many times as desired (but once enough)

When the robot has reached the exit, it is necessary to stop it to win the game.
*/

type point struct{ x, y int }

type game struct {
	gmap   [][]string
	pos    point
	height int
	width  int
	power  bool
	dead   bool
	won    bool
}

func (g *game) displayMap() {
	for _, r := range g.gmap {
		fmt.Println(strings.Join(r, ""))
	}
}

func newGameMap(mapVal string) *game {
	g := game{power: false, dead: false, won: false}

	for i, row := range strings.Split(mapVal, "\n") {
		// Grab the starting point of the robot so we know where to start
		if idx := strings.Index(row, "M"); idx != -1 {
			g.pos = point{idx, i}
		}
		g.gmap = append(g.gmap, strings.Split(row, ""))
	}
	g.height = len(g.gmap) - 1
	g.width = len(g.gmap[0]) - 1

	return &g
}

func (g *game) execute(dir string) {
	for _, s := range strings.Split(dir, "") {
		switch s {
		case "I":
			g.power = true
		case "-":
			g.power = false
		case "N":
			g.makeMove(g.pos.x, g.pos.y-1)
		case "S":
			g.makeMove(g.pos.x, g.pos.y+1)
		case "E":
			g.makeMove(g.pos.x+1, g.pos.y)
		case "W":
			g.makeMove(g.pos.x-1, g.pos.y)
		}

	}
}

func (g *game) makeMove(x, y int) {
	if !g.power || g.dead || x > g.width || y > g.height || g.won {
		return
	}

	switch g.gmap[y][x] {
	case "+":
		return
	case "M":
		break
	case "*":
		g.dead = true
	case "0":
		if g.width == x || g.height == y {
			g.won = true
		}
	}

	g.pos.x = x
	g.pos.y = y
	g.gmap[y][x] = "M"
}

func main() {
	mapStr :=
		`+++++++++++++
+000000000000
+0000000*000+
+00000000000+
+00000000*00+
+00000000000+
M00000000000+
+++++++++++++`

	g := newGameMap(mapStr)
	g.execute("IENENNNNEEEEEEEEEE-")
	g.displayMap()
	if g.won {
		fmt.Println("YOU MADE IT!")
	} else if g.dead {
		fmt.Println("You died")
	} else {
		fmt.Println("You're stuck")
	}
}
