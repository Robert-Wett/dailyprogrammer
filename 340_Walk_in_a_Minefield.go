package main
// Challenge: https://www.reddit.com/r/dailyprogrammer/comments/7d4yoe/20171114_challenge_340_intermediate_walk_in_a
// Play link: https://play.golang.org/p/4O2bkHxqy9
import (
	"crypto/rand"
	"fmt"
	"math/big"
	"strings"
	"time"
)

const (
	WALL      = "+"
	SPACE     = "0"
	MINE      = "*"
	ROBOT     = "M"
	STEP      = "."
	EXPLOSION = "#"
	IGNITION  = "I"
	POWEROFF  = "-"
	NORTH     = "N"
	EAST      = "E"
	SOUTH     = "S"
	WEST      = "W"
)

type point struct{ x, y int }

type game struct {
	gmap   [][]string
	pos    point
	height int
	width  int
	power  bool
	dead   bool
	inExit bool
	won    bool
}

func generate(width, height, mineNum int) string {

	var gMap [][]string
	topAndBottom := strings.Split(strings.Repeat(WALL, width), "")

	// Add the top wall
	gMap = append(gMap, topAndBottom)

	// Fill in the rest of the map with valid move spots and surrounding walls
	for i := 0; i < height; i++ {
		gMap = append(gMap, strings.Split(WALL+strings.Repeat(SPACE, width-2)+WALL, ""))
	}

	// Add the bottom wall
	gMap = append(gMap, topAndBottom)

	// Add an exit to the right side of the map
	exitRow := randomInt(height - 1)
	gMap[exitRow+1][width-1] = SPACE

	// Add a start to the left side of the map
	startRow := randomInt(height - 1)
	gMap[startRow+1][0] = ROBOT

	// Add mines
	for mineNum > 0 {
		rowNum := randomInt(height-2) + 1
		colNum := randomInt(width-2) + 1
		// If the mine is blocking the start, try again
		if rowNum == startRow && colNum == 1 {
			continue
		}
		// If the mine is blocking the exit, try again
		if rowNum == exitRow && colNum == width-2 {
			continue
		}
		// Only add the mine if we haven't done so already at this spot
		if gMap[rowNum][colNum] != MINE {
			gMap[rowNum][colNum] = MINE
			mineNum--
		}
	}

	var s string

	for _, v := range gMap {
		v = append(v, "\n")
		s += strings.Join(v, "")
	}
	return s
}

func yesNo() bool {
	return randomInt(2) == 1
}

func randomInt(max int) int {
	nBig, err := rand.Int(rand.Reader, big.NewInt(int64(max)))
	if err != nil {
		panic(err)
	}
	n := nBig.Int64()
	return int(n)
}

func (g *game) displayMap() {
	fmt.Printf("\x0c")
	for _, r := range g.gmap {
		fmt.Println(strings.Join(r, ""))
	}
}

func newGameMap(mapVal string) *game {
	g := game{power: false, dead: false, inExit: false, won: false}

	for i, row := range strings.Split(mapVal, "\n") {
		// Grab the starting point of the robot so we know where to start
		if idx := strings.Index(row, ROBOT); idx != -1 {
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
		case IGNITION:
			g.power = true
		case POWEROFF:
			g.power = false
			g.checkForWin()
		case NORTH:
			g.makeMove(g.pos.x, g.pos.y-1)
		case SOUTH:
			g.makeMove(g.pos.x, g.pos.y+1)
		case EAST:
			g.makeMove(g.pos.x+1, g.pos.y)
		case WEST:
			g.makeMove(g.pos.x-1, g.pos.y)
		}

	}
}

func (g *game) checkForWin() {
	if !g.power && g.inExit {
		g.won = true
	}
}

func (g *game) makeMove(x, y int) {
	if !g.power || g.dead || g.won || x > g.width || y > g.height || x < 0 || y < 0 {
		return
	}

	switch g.gmap[y][x] {
	case WALL:
		return
	case STEP:
		break
	case MINE:
		g.dead = true
	case SPACE:
		if g.won {
			return
		}
		if g.width == x || g.height == y || x == 0 || y == 0 {
			g.inExit = true
		} else {
			g.inExit = false
		}
	}

	time.Sleep(time.Millisecond * 100)
	g.pos.x = x
	g.pos.y = y
	if g.dead {
		g.gmap[y][x] = EXPLOSION
	} else {
		g.gmap[y][x] = STEP
	}
	g.displayMap()

}

func randomDirection(numChoices int) string {
	choices := []string{"N", "E", "S", "W"}
	var directions string
	for i := 0; i < numChoices; i++ {
		directions += choices[randomInt(4)]
	}
	return "I" + directions + "-"
}
func main() {
	newMap := generate(20, 7, 5)
	g := newGameMap(newMap)
	directions := randomDirection(50)
	g.execute(directions)
	g.displayMap()
	if g.won {
		fmt.Println("YOU MADE IT!")
	} else if g.dead {
		fmt.Println("You died")
	} else {
		fmt.Println("You're stuck")
	}
	fmt.Println(fmt.Sprintf("Directions taken: %s", directions))
}
