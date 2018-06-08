package main

import (
	"fmt"
	"log"
	"math"
	"math/rand"
	"os"
	"sort"
	"time"
)

var (
	seed           = "a bcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[{]}|;:'/?,<.>~\"\\"
	populationSize = 1000
	keeps          = 200
	mutationChance = 5
	target         = "Hello, world!"
)

type Babby struct {
	value   string
	fitness int
}

func newBabby() *Babby {
	var b Babby
	b.build()
	return &b
}

func (b *Babby) build() {
	if b.value == "" {
		v := make([]byte, len(target))
		for i := range v {
			v[i] = seed[rand.Intn(len(seed))]
		}
		b.value = string(v)
	}
	b.fitness = hammingDistance(b.value, target)
}

func (b *Babby) mutate() {
	mutation := seed[rand.Intn(len(seed))]
	mutateIdx := rand.Intn(len(b.value))
	b.value = b.value[:mutateIdx] + string(mutation) + b.value[mutateIdx+1:]
}

func (b *Babby) makeBabby(daddy Babby) Babby {
	var v string
	for i := 0; i < len(b.value); i++ {
		if rand.Intn(99)+1 < 50 {
			v += string(b.value[i])
		} else {
			v += string(daddy.value[i])
		}
	}
	kid := Babby{value: v}
	kid.build()
	return kid
}

func generateFirstPopulation() []Babby {
	population := make([]Babby, populationSize)
	for i := 0; i < populationSize; i++ {
		population[i] = *newBabby()
	}

	return population
}

func generateNextPopulation(strong, random []Babby) []Babby {
	var r []Babby
	for i := 0; i < len(strong); i++ {
		for j := 0; j < 5; j++ {
			r = append(r, strong[i].makeBabby(random[i]))
		}
	}

	// shuffle array
	for i := range r {
		j := rand.Intn(i + 1)
		r[i], r[j] = r[j], r[i]
	}

	return r
}

func selectNextGeneration(b []Babby) ([]Babby, []Babby) {
	var randPopulation []Babby
	for i := 0; i < keeps; i++ {
		randPopulation = append(randPopulation, b[rand.Intn(len(b))])
	}
	sort.Slice(b, func(i, j int) bool {
		return b[i].fitness < b[j].fitness
	})

	return b[:keeps], randPopulation[:]
}

func hammingDistance(s1, s2 string) int {
	var count int
	r1 := []rune(s1)
	r2 := []rune(s2)

	if len(r1) != len(r2) {
		log.Panic("Can only calculate Hamming Distance on equal length strings")
	}
	for i := 0; i < len(r1); i++ {
		if r1[i] != r2[i] {
			count += int(math.Abs(float64(r1[i] - r2[i])))
		}
	}

	return count
}

func makeLotsOfBabbies() {
	var fitness = math.MaxInt64
	population := generateFirstPopulation()
	for i := 0; i < math.MaxInt64; i++ {
		selected, random := selectNextGeneration(population)
		population = generateNextPopulation(selected, random)
		sort.Slice(population, func(i, j int) bool {
			return population[i].fitness < population[j].fitness
		})

		superFitBabby := population[0]

		if superFitBabby.fitness < fitness {
			fmt.Println(fmt.Sprintf("|Gen: %-5d|Fitness: %-3d| %s", i, superFitBabby.fitness, superFitBabby.value))
			fitness = superFitBabby.fitness
		}

		if fitness == 0 {
			break
		}

		for i := 0; i < len(population); i++ {
			if rand.Intn(100)+1 < mutationChance {
				population[i].mutate()
			}
		}
	}
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	if len(os.Args) > 1 {
		target = os.Args[1]
	}
	makeLotsOfBabbies()
}
