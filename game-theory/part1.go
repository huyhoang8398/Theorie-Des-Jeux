package game_theory

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

func CompareMatrix(mat1 [][]int, mat2 [][]int) bool {
	row := len(mat1)
	if row != len(mat2) {
		return false
	}
	for i := 0; i < row; i++ {
		col := len(mat1[i])
		if col != len(mat2[i]) {
			return false
		}
		for j := 0; j < col; j++ {
			if mat1[i][j] != mat2[i][j] {
				return false
			}
		}
	}
	return true
}

func ReverseSignMatrix(mat [][]int) [][]int {
	row := len(mat)
	reverseMat := make([][]int, row)
	for i := 0; i < row; i++ {
		col := len(mat[i])
		reverseMat[i] = make([]int, col)
		for j := 0; j < col; j++ {
			reverseMat[i][j] = -mat[i][j]
		}
	}
	return reverseMat
}

func CheckBetter(pA [][]int, pB [][]int, i int, j int) bool {
	//pA check
	for k := 0; k < 2; k++ {
		if pA[k][j] > pA[i][j] {
			return true
		}
	}
	//pB check
	for k := 0; k < 2; k++ {
		if pB[i][k] > pB[i][j] {
			return true
		}
	}
	return false
}

func IndexMaximalElement(mat [][]int) (int, int) {
	var x, y int
	max := math.MinInt32

	row := len(mat)
	for i := 0; i < row; i++ {
		col := len(mat[i])
		for j := 0; j < col; j++ {
			if max < mat[i][j] {
				x = i
				y = j
				max = mat[i][j]
			}
		}
	}

	return x, y
}

func SolvePart1(pA, pB [][]int) string {
	result := ""

	fmt.Println(pA)
	fmt.Println(pB)

	//check zerosum game
	zeroSum := CompareMatrix(pA, ReverseSignMatrix(pB))
	fmt.Printf("Zero sum game ? %t\n", zeroSum)
	result = result + fmt.Sprintf("Zero sum game ? %t<br/>", zeroSum)

	fmt.Println("Nash equilibrium state \nplayer A, player B:")
	result = result + "Nash equilibrium state <br/>player A, player B:<br/>"
	for i := 0; i < 2; i++ {
		for j := 0; j < 2; j++ {
			existBetter := CheckBetter(pA, pB, i,j)
			if !existBetter {
				fmt.Printf("%d,%d\n", i, j)
				result = result + fmt.Sprintf("%d,%d<br/>", i, j)
			}
		}
	}

	//find mixed Nash
	var probA, probB float64
	probA = float64(-pB[1][0] + pB[1][1]) / float64(pB[0][0] - pB[1][0] - pB[0][1] + pB[1][1])
	probB = float64(-pA[0][1] + pA[1][1]) / float64(pA[0][0] - pA[0][1] - pA[1][0] + pA[1][1])

	if probA >= 1 || probA <= 0 {
		fmt.Println("Can't find mixed strategy for player A because player B has dominated strategy")
		result = result + "Can't find mixed strategy for player A because player B has dominated strategy<br/>"
		_, y := IndexMaximalElement(pB)
		fmt.Printf("Player B dominant strategy: %d\n", y)
		result = result + fmt.Sprintf("Player B dominant strategy: %d<br/>", y)
	} else {
		fmt.Printf("Mixed strategy player A: [%g, %g]\n", probA, 1-probA)
		result = result + fmt.Sprintf("Mixed strategy player A: [%g, %g]<br/>", probA, 1-probA)
	}

	if probB >= 1 || probB <= 0 {
		fmt.Println("Can't find mixed strategy for player B because player A has dominated strategy")
		result = result + "Can't find mixed strategy for player B because player A has dominated strategy<br/>"
		x, _ := IndexMaximalElement(pA)
		fmt.Printf("Player A dominant strategy: %d\n", x)
		result = result + fmt.Sprintf("Player A dominant strategy: %d<br/>", x)
	} else {
		fmt.Printf("Mixed strategy player B: [%g, %g]\n", probB, 1-probB)
		result = result + fmt.Sprintf("Mixed strategy player B: [%g, %g]<br/>", probB, 1-probB)
	}

	return result
}

func SimulatePart1(showStep bool, userProbA, userProbB float64, pA, pB [][]int) string {
	result := ""
	tmp := ""

	fmt.Println(pA)
	fmt.Println(pB)

	//find mixed Nash
	var probA, probB float64
	probAresult := float64(-pB[1][0] + pB[1][1]) / float64(pB[0][0] - pB[1][0] - pB[0][1] + pB[1][1])
	probBresult := float64(-pA[0][1] + pA[1][1]) / float64(pA[0][0] - pA[0][1] - pA[1][0] + pA[1][1])

	probA = probAresult
	probB = 1 - probAresult
	if probAresult >= 1 || probAresult <= 0 {
		if probBresult >= 1 || probBresult <= 0 {
			probA = 0
			probB = 0
		}
		probA = probBresult
		probB = 1 - probBresult
	}

	rand.Seed(time.Now().UTC().UnixNano())

	result += "<div className=\"row\">"
	result += "<div className=\"column\">"

	result += fmt.Sprintf("Given strategy: probA = %g, probB = %g<br/>", userProbA, userProbB)
	result += "Simulate the game on 100 achievements with the given strategy<br/>"

	var actA, actB int
	var utilityA, utilityB int
	utilityA = 0
	utilityB = 0
	for i := 0; i < 100; i++ {
		actA = RandomAction(userProbA)
		actB = RandomAction(userProbB)

		utilityA += pA[actA-1][actB-1]
		utilityB += pB[actA-1][actB-1]
		if showStep {
			tmp += fmt.Sprintf("playerA + %d ; playerB + %d<br/>", pA[actA-1][actB-1], pB[actA-1][actB-1])
		}
	}
	result += fmt.Sprintf("The average player A utility: %g<br/>", float64(utilityA)/100)
	result += fmt.Sprintf("The average player B utility: %g<br/>", float64(utilityB)/100)

	result += "<br/>"
	if showStep {
		result += "Step by step:<br/>"
		result += tmp
	}
	tmp = ""

	result += "</div>"
	result += "<div className=\"column\">"

	result += fmt.Sprintf("Mixed Nash equilibrium strategy: probA = %g, probB = %g<br/>", probA, probB)
	result += "Simulate the game on 100 achievements with the Mixed Nash equilibrium strategy<br/>"

	utilityA = 0
	utilityB = 0
	for i := 0; i < 100; i++ {
		actA = RandomAction(probA)
		actB = RandomAction(probB)

		utilityA += pA[actA-1][actB-1]
		utilityB += pB[actA-1][actB-1]
		if showStep {
			tmp += fmt.Sprintf("playerA + %d ; playerB + %d<br/>", pA[actA-1][actB-1], pB[actA-1][actB-1])
		}
	}
	result += fmt.Sprintf("The average player A utility: %g<br/>", float64(utilityA)/100)
	result += fmt.Sprintf("The average player B utility: %g<br/>", float64(utilityB)/100)

	result += "<br/>"
	if showStep {
		result += "Step by step:<br/>"
		result += tmp
	}
	tmp = ""

	result += "</div>"
	result += "</div>"

	return result
}

func RandomAction(prob float64) int {
	r := rand.Float64()
	if r < prob {
		return 1
	}
	return 2
}

