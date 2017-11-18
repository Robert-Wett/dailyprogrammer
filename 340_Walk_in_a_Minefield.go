package main
// Challenge: https://www.reddit.com/r/dailyprogrammer/comments/7d4yoe/20171114_challenge_340_intermediate_walk_in_a
// Play link: https://play.golang.org/p/LvuxEixMFO
import (
	"crypto/rand"
	"fmt"
	"math/big"
	"strings"
	"time"
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
	topAndBottom := strings.Split(strings.Repeat("+", width), "")
	gMap = append(gMap, topAndBottom)
	for i := 0; i < height; i++ {
		gMap = append(gMap, strings.Split(strings.Repeat("0", width), ""))
	}
	// Make a pass to build the walls
	for i := 0; i < height+1; i++ {
		gMap[i][0] = "+"
		gMap[i][width-1] = "+"
	}
	gMap = append(gMap, topAndBottom)

	// Add an exit
	exitRow := randomInt(height - 1)
	gMap[exitRow+1][width-1] = "0"

	// Add a start
	startRow := randomInt(height - 1)
	gMap[startRow+1][0] = "M"

	// Add mines
	for m := mineNum; m > 0; m-- {
		rowNum := randomInt(height-1) + 1
		colNum := randomInt(width-1) + 1
		gMap[rowNum][colNum] = "*"
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
			g.checkForWin()
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
	case "+":
		return
	case "M":
		break
	case "*":
		g.dead = true
	case "0":
		if g.won {
			return
		}
		if g.width == x || g.height == y || x == 0 || y == 0 {
			g.inExit = true
		} else {
			g.inExit = false
		}
	}

	time.Sleep(time.Millisecond * 200)
	g.pos.x = x
	g.pos.y = y
	g.gmap[y][x] = "M"
	g.displayMap()

}

func main() {
	newMap := generate(10, 5, 2)
	g := newGameMap(newMap)
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
