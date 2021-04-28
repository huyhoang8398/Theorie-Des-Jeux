package game_theory

import "fmt"

func GetMaxCase(nbChoice []int) int {
	maxCase := 1
	for _, c := range nbChoice {
		maxCase *= c
	}
	return maxCase
}

func CopyArray(arr []int) []int {
	n := len(arr)
	newArr := make([]int, n)
	for i := 0; i < n; i++ {
		newArr[i] = arr[i]
	}
	return newArr
}

func SumArray(arr []int) int {
	n := len(arr)
	sum := 0
	for i := 0; i < n; i++ {
		sum += arr[i]
	}
	return sum
}

func CopyArray2Dims(arr [][]int) [][]int {
	n := len(arr)
	newArr := make([][]int, n)
	for i := 0; i < n; i++ {
		m := len(arr[i])
		newArr[i] = make([]int, m)
		for j := 0; j < m; j++ {
			newArr[i][j] = arr[i][j]
		}
	}
	return newArr
}

func CompareArray(a []int, b []int) bool {
	n := len(a)
	if n != len(b) {
		return false
	}

	for i:= 0; i < n; i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func FindPermuPos(per []int, permuList [][]int) int {
	n := len(permuList)
	for i := 0; i < n; i++ {
		if CompareArray(per, permuList[i]) {
			return i
		}
	}
	return -1
}

func GetNewPivot(nash []int) int {
	n := len(nash)
	for i := 0; i < n; i++ {
		if nash[i] == -1 {
			return i
		}
	}
	return -1
}

func SolvePart3(n int, nbChoice []int) string {

	result := ""
	tmp := ""

	fmt.Printf("N = %d\n", n)
	fmt.Printf("Max choice array: %v\n", nbChoice)
	result += fmt.Sprintf("N = %d<br/>", n)
	result += fmt.Sprintf("Max choice array: %v<br/>", nbChoice)

	//generate permutation
	maxChoice := GetMaxCase(nbChoice)
	cIter := make([]int, n)
	permu := make([][]int, 0, maxChoice)

	permu = append(permu, CopyArray(cIter))
	fmt.Printf("# Case %v\n", cIter)
	tmp += fmt.Sprintf("# Case %v<br/>", cIter)
	index := 0
	for {
		if index >= n {
			break
		} else {
			if cIter[index]+1 < nbChoice[index] {
				cIter[index] += 1
				fmt.Printf("# Case %v\n", cIter)
				tmp += fmt.Sprintf("# Case %v<br/>", cIter)
				permu = append(permu, CopyArray(cIter))
				if index > 0 {
					index = 0
				}
			} else {
				cIter[index] = 0
				index += 1
			}
		}
	}

	data := CopyArray2Dims(permu)

	zeroSum := true
	for i := 0; i < maxChoice; i++ {
		if SumArray(data[i]) != 0 {
			zeroSum = false
			break
		}
	}
	if zeroSum {
		fmt.Println("Zero sum game !!!")
		result += fmt.Sprint("Zero sum game !!!<br/>")
	} else {
		fmt.Println("NON-zero sum game.")
		result += fmt.Sprint("NON-zero sum game.<br/>")
	}

	pureNash := make([]int, maxChoice)
	for i := 0; i < maxChoice; i++ {
		pureNash[i] = -1
	}

	//use pivot case to compare
	cPivot := CopyArray(permu[0])
	pivot := 0
	//use iter to get new case
	cIter = CopyArray(cPivot)
	iterPos := pivot

	plrIdx := 0
	for {
		if plrIdx >= n {
			//maybe pivot is pure nash, get new pivot
			pureNash[pivot] = 1
			pivot = GetNewPivot(pureNash)
			if pivot == -1 {
				break
			} else {
				cPivot = CopyArray(permu[pivot])
				cIter = CopyArray(cPivot)
				iterPos = pivot
				if plrIdx > 0 {
					plrIdx = 0
				}
			}
		} else {
			//if possible case
			if (cIter[plrIdx]+1) % nbChoice[plrIdx] != cPivot[plrIdx] {
				cIter[plrIdx] = (cIter[plrIdx]+1) % nbChoice[plrIdx]
				iterPos = FindPermuPos(cIter, permu)
				if iterPos == -1 {
					fmt.Println("error:appear case not on permutation list")
					result += fmt.Sprint("error:appear case not on permutation list<br/>")
				}

				//if new case, then compare
				if pureNash[iterPos] == -1 {
					//if pivot case better than new case
					if data[pivot][plrIdx] > data[iterPos][plrIdx] {
						pureNash[iterPos] = 0
						//if new case better than pivot case
					} else if data[pivot][plrIdx] < data[iterPos][plrIdx] {
						pureNash[pivot] = 0
						cPivot = CopyArray(cIter)
						pivot = iterPos
						if plrIdx > 0 {
							plrIdx = 0
						}
					}
				} else if pureNash[iterPos] == 0 {
					//if new case better than pivot case
					if data[pivot][plrIdx] < data[iterPos][plrIdx] {
						pureNash[pivot] = 0
						pivot = GetNewPivot(pureNash)
						if pivot == -1 {
							break
						} else {
							cPivot = CopyArray(permu[pivot])
							cIter = CopyArray(cPivot)
							iterPos = pivot
							if plrIdx > 0 {
								plrIdx = 0
							}
						}
					}
				}
			} else {
				cIter = CopyArray(cPivot)
				plrIdx += 1
			}
		}
	}

	//get pure nash case
	if SumArray(pureNash) > 0 {
		fmt.Println("Pure Nash Equilibrium Case(s):")
		result += fmt.Sprint("Pure Nash Equilibrium Case(s):<br/>")
		length := len(pureNash)
		for i := 0; i < length; i++ {
			if pureNash[i] == 1 {
				fmt.Println(permu[i])
				result += fmt.Sprintf("%v<br/>", permu[i])
			}
		}
	}

	result += "<br/>"
	result += "<br/>"
	result += tmp

	return result
}

func SolvePart4(n int, nbChoice []int, permu [][]int) string {
	result := ""

	fmt.Printf("N = %d\n", n)
	fmt.Printf("Max choice array: %v\n", nbChoice)
	result += fmt.Sprintf("N = %d<br/>", n)
	result += fmt.Sprintf("Max choice array: %v<br/>", nbChoice)

	maxChoice := GetMaxCase(nbChoice)
	cIter := make([]int, n)

	data := CopyArray2Dims(permu)

	zeroSum := true
	for i := 0; i < maxChoice; i++ {
		if SumArray(data[i]) != 0 {
			zeroSum = false
			break
		}
	}
	if zeroSum {
		fmt.Println("Zero sum game !!!")
		result += fmt.Sprint("Zero sum game !!!<br/>")
	} else {
		fmt.Println("NON-zero sum game.")
		result += fmt.Sprint("NON-zero sum game.<br/>")
	}

	pureNash := make([]int, maxChoice)
	for i := 0; i < maxChoice; i++ {
		pureNash[i] = -1
	}

	//use pivot case to compare
	cPivot := CopyArray(permu[0])
	pivot := 0
	//use iter to get new case
	cIter = CopyArray(cPivot)
	iterPos := pivot

	plrIdx := 0
	for {
		if plrIdx >= n {
			//maybe pivot is pure nash, get new pivot
			pureNash[pivot] = 1
			pivot = GetNewPivot(pureNash)
			if pivot == -1 {
				break
			} else {
				cPivot = CopyArray(permu[pivot])
				cIter = CopyArray(cPivot)
				iterPos = pivot
				if plrIdx > 0 {
					plrIdx = 0
				}
			}
		} else {
			//if possible case
			if (cIter[plrIdx]+1) % nbChoice[plrIdx] != cPivot[plrIdx] {
				cIter[plrIdx] = (cIter[plrIdx]+1) % nbChoice[plrIdx]
				iterPos = FindPermuPos(cIter, permu)
				if iterPos == -1 {
					fmt.Println("error:appear case not on permutation list")
					result += fmt.Sprint("error:appear case not on permutation list<br/>")
				}

				//if new case, then compare
				if pureNash[iterPos] == -1 {
					//if pivot case better than new case
					if data[pivot][plrIdx] > data[iterPos][plrIdx] {
						pureNash[iterPos] = 0
						//if new case better than pivot case
					} else if data[pivot][plrIdx] < data[iterPos][plrIdx] {
						pureNash[pivot] = 0
						cPivot = CopyArray(cIter)
						pivot = iterPos
						if plrIdx > 0 {
							plrIdx = 0
						}
					}
				} else if pureNash[iterPos] == 0 {
					//if new case better than pivot case
					if data[pivot][plrIdx] < data[iterPos][plrIdx] {
						pureNash[pivot] = 0
						pivot = GetNewPivot(pureNash)
						if pivot == -1 {
							break
						} else {
							cPivot = CopyArray(permu[pivot])
							cIter = CopyArray(cPivot)
							iterPos = pivot
							if plrIdx > 0 {
								plrIdx = 0
							}
						}
					}
				}
			} else {
				cIter = CopyArray(cPivot)
				plrIdx += 1
			}
		}
	}

	//get pure nash case
	if SumArray(pureNash) > 0 {
		fmt.Println("Pure Nash Equilibrium Case(s):")
		result += fmt.Sprint("Pure Nash Equilibrium Case(s):<br/>")
		length := len(pureNash)
		for i := 0; i < length; i++ {
			if pureNash[i] == 1 {
				fmt.Println(permu[i])
				result += fmt.Sprintf("%v<br/>", permu[i])
			}
		}
	}

	return result
}