package game_theory

import (
	"fmt"
	"math"
)

func FindMaxEachColumn(n, m int, mat [][]int) []int {
	maxCol := make([]int, m)
	for i := 0; i < m; i++ {
		maxCol[i] = math.MinInt32
	}
	for j := 0; j < m; j++ {
		for i := 0; i < n; i++ {
			if maxCol[j] < mat[i][j] {
				maxCol[j] = mat[i][j]
			}
		}
	}
	return maxCol
}

func GetMaxAOneHot(n, m int, mat [][]int, max []int) [][]int {
	maxOneHot := make([][]int, n)
	for i := 0; i < n; i++ {
		maxOneHot[i] = make([]int, m)
	}

	for j := 0; j < m; j++ {
		for i := 0; i < n; i++ {
			if mat[i][j] == max[j] {
				maxOneHot[i][j] = 1
			}
		}
	}

	return maxOneHot
}

func FindMaxEachRow(n, m int, mat [][]int) []int {
	maxRow := make([]int, n)
	for i := 0; i < n; i++ {
		maxRow[i] = math.MinInt32
	}
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			if maxRow[i] < mat[i][j] {
				maxRow[i] = mat[i][j]
			}
		}
	}
	return maxRow
}

func GetMaxBOneHot(n, m int, mat [][]int, max []int) [][]int {
	maxOneHot := make([][]int, n)
	for i := 0; i < n; i++ {
		maxOneHot[i] = make([]int, m)
	}

	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			if mat[i][j] == max[i] {
				maxOneHot[i][j] = 1
			}
		}
	}

	return maxOneHot
}

func MultiplyCellByCellMatrix(n, m int, pA [][]int, pB [][]int) [][]int {
	mat := make([][]int, n)
	for i := 0; i < n; i++ {
		mat[i] = make([]int, m)
		for j := 0; j < m; j++ {
			mat[i][j] = pA[i][j]*pB[i][j]
		}
	}
	return mat
}

func ProductAllColMatrix(n, m int, maxAOneHot [][]int) []int {
	productAllCol := make([]int, n)
	for i := 0; i < n; i++ {
		productAllCol[i] = 1
	}
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			productAllCol[i] *= maxAOneHot[i][j]
		}
	}
	return productAllCol
}

func ProductAllRowMatrix(n, m int, maxBOneHot [][]int) []int {
	productAllRow := make([]int, m)
	for i := 0; i < m; i++ {
		productAllRow[i] = 1
	}
	for j := 0; j < m; j++ {
		for i := 0; i < n; i++ {
			productAllRow[j] *= maxBOneHot[i][j]
		}
	}
	return productAllRow
}

func SolvePart2(n, m int, pA, pB [][]int) string {
	result := ""

	fmt.Println(pA)
	fmt.Println(pB)

	//check zerosum game
	zeroSum := CompareMatrix(pA, ReverseSignMatrix(pB))
	fmt.Printf("Zero sum game ? %t\n", zeroSum)
	result += fmt.Sprintf("Zero sum game ? %t<br/>", zeroSum)

	//find the best choice of A for each choice of B (max of each col)
	maxColA := FindMaxEachColumn(n, m, pA)
	maxAOneHot := GetMaxAOneHot(n, m, pA, maxColA)
	fmt.Print("Best choice index-matrix for A:<br/>")
	result += fmt.Sprint("Best choice index-matrix for A:<br/>")
	fmt.Println(maxAOneHot)
	result += fmt.Sprint(maxAOneHot)
	result += "<br/>"

	//find the best choice of B for each choice of A (max of each row)
	maxColB := FindMaxEachRow(n, m, pB)
	maxBOneHot := GetMaxBOneHot(n, m, pB, maxColB)
	fmt.Println("Best choice index-matrix for B:")
	result += fmt.Sprint("Best choice index-matrix for B:<br/>")
	fmt.Println(maxBOneHot)
	result += fmt.Sprint(maxBOneHot)
	result += "<br/>"

	//find the pure Nash by multiply 2 matrix cell by cell
	pureNash := MultiplyCellByCellMatrix(n, m, maxAOneHot, maxBOneHot)
	fmt.Println("Pure Nash Index:")
	result += fmt.Sprint("Pure Nash Index:<br/>")
	fmt.Println(pureNash)
	result += fmt.Sprint(pureNash)
	result += "<br/>"
	fmt.Println("Pure Nash Case(s):")
	result += fmt.Sprint("Pure Nash Case(s):<br/>")
	for i := 0; i < n; i++ {
		for j := 0; j < m; j++ {
			if pureNash[i][j] == 1 {
				fmt.Printf("%d,%d\n", i, j)
				result += fmt.Sprintf("%d,%d<br/>", i, j)
			}
		}
	}

	//product of all the col
	dominateA := ProductAllColMatrix(n, m, maxAOneHot)
	fmt.Println(dominateA)
	for i, v := range dominateA {
		if v == 1 {
			fmt.Printf("Player A dominated choice number: %d\n", i)
			result += fmt.Sprintf("Player A dominated choice number: %d<br/>", i)
		}
	}

	//product of all the row
	dominateB := ProductAllRowMatrix(n, m, maxBOneHot)
	fmt.Println(dominateB)
	for i, v := range dominateB {
		if v == 1 {
			fmt.Printf("Player B dominated choice number: %d\n", i)
			result += fmt.Sprintf("Player B dominated choice number: %d<br/>", i)
		}
	}

	return result;
}
