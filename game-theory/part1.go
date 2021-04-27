package game_theory

import (
	"fmt"
	"math"
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
	fmt.Println(ReverseSignMatrix(pB))

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
