package main

import (
	"fmt"
	"log"
	"math"
	"strconv"
	"strings"
)

// HammingDistance calculates the 'distance' between two equal length strings
func HammingDistance(s1, s2 string) int {
	var count int
	r1 := []rune(s1)
	r2 := []rune(s2)
	if len(r1) != len(r2) {
		log.Panic("Can only calculate Hamming Distance on equal length strings")
	}
	for i := 0; i < len(r1); i++ {
		if r1[i] != r2[i] {
			count++
		}
	}

	return count
}

func mostSimilarString(input string) string {
	raw := strings.Fields(input)
	numCmp, _ := strconv.Atoi(raw[0])
	lines := raw[1:]

	var min = math.MaxInt64
	var closest string
	var curLine int
	for round := 0; round < numCmp; round++ {
		var current int
		for i, l := range lines[1:] {
			if i == curLine {
				continue
			}

			current += HammingDistance(lines[curLine], l)
		}
		if current < min {
			min = current
			closest = lines[curLine]
		}

		curLine++
	}

	return closest
}

func main() {
	fmt.Println(mostSimilarString(`11
		AACACCCTATA
		CTTCATCCACA
		TTTCAATTTTC
		ACAATCAAACC
		ATTCTACAACT
		ATTCCTTATTC
		ACTTCTCTATT
		TAAAACTCACC
		CTTTTCCCACC
		ACCTTTTCTCA
		TACCACTACTT`))

	fmt.Println(mostSimilarString(`21
		ACAAAATCCTATCAAAAACTACCATACCAAT
		ACTATACTTCTAATATCATTCATTACACTTT
		TTAACTCCCATTATATATTATTAATTTACCC
		CCAACATACTAAACTTATTTTTTAACTACCA
		TTCTAAACATTACTCCTACACCTACATACCT
		ATCATCAATTACCTAATAATTCCCAATTTAT
		TCCCTAATCATACCATTTTACACTCAAAAAC
		AATTCAAACTTTACACACCCCTCTCATCATC
		CTCCATCTTATCATATAATAAACCAAATTTA
		AAAAATCCATCATTTTTTAATTCCATTCCTT
		CCACTCCAAACACAAAATTATTACAATAACA
		ATATTTACTCACACAAACAATTACCATCACA
		TTCAAATACAAATCTCAAAATCACCTTATTT
		TCCTTTAACAACTTCCCTTATCTATCTATTC
		CATCCATCCCAAAACTCTCACACATAACAAC
		ATTACTTATACAAAATAACTACTCCCCAATA
		TATATTTTAACCACTTACCAAAATCTCTACT
		TCTTTTATATCCATAAATCCAACAACTCCTA
		CTCTCAAACATATATTTCTATAACTCTTATC
		ACAAATAATAAAACATCCATTTCATTCATAA
		CACCACCAAACCTTATAATCCCCAACCACAC`))
}
