package main

import (
	gametheory "github.com/game-theory/game-theory-go/game-theory"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"strconv"
	"strings"
)

func main() {
	var server = gin.New()
	server.LoadHTMLFiles("./build/index.html")
	server.Use(static.Serve("/static", static.LocalFile("./build/static", false)))
	server.POST("/api/part1", func(context *gin.Context) {
		body, err := context.GetRawData()
		if err != nil {
			context.Writer.Write([]byte("Wrong data"))
			return
		}
		data := string(body)
		pos := strings.IndexByte(data, '#')
		A := strings.Split(data[:pos], ";")
		B := strings.Split(data[pos+1:], ";")

		pA := make([][]int, 2)
		for i := 0; i < 2; i++ {
			pA[i] = make([]int, 2)
			pts := strings.Split(A[i], ",")
			for j := 0; j < 2; j++ {
				tmp, _ := strconv.ParseInt(pts[j], 10, 32)
				pA[i][j] = int(tmp)
			}
		}
		pB := make([][]int, 2)
		for i := 0; i < 2; i++ {
			pB[i] = make([]int, 2)
			pts := strings.Split(B[i], ",")
			for j := 0; j < 2; j++ {
				tmp, _ := strconv.ParseInt(pts[j], 10, 32)
				pB[i][j] = int(tmp)
			}
		}

		result := gametheory.SolvePart1(pA, pB)
		context.Writer.Write([]byte(result))
	})
	server.POST("/api/part2", func(context *gin.Context) {
		body, err := context.GetRawData()
		if err != nil {
			context.Writer.Write([]byte("Wrong data"))
			return
		}
		data := string(body)
		pos := strings.IndexByte(data, '#')
		A := strings.Split(data[:pos], ";")
		B := strings.Split(data[pos+1:], ";")

		n := len(A)
		m := 0

		pA := make([][]int, n)
		for i := 0; i < n; i++ {
			pts := strings.Split(A[i], ",")
			if m == 0 {
				m = len(pts)
			}
			pA[i] = make([]int, m)
			for j := 0; j < m; j++ {
				tmp, _ := strconv.ParseInt(pts[j], 10, 32)
				pA[i][j] = int(tmp)
			}
		}
		pB := make([][]int, n)
		for i := 0; i < n; i++ {
			pts := strings.Split(B[i], ",")
			pB[i] = make([]int, m)
			for j := 0; j < m; j++ {
				tmp, _ := strconv.ParseInt(pts[j], 10, 32)
				pB[i][j] = int(tmp)
			}
		}

		result := gametheory.SolvePart2(n, m, pA, pB)
		context.Writer.Write([]byte(result))
	})
	server.POST("/api/part3", func(context *gin.Context) {
		body, err := context.GetRawData()
		if err != nil {
			context.Writer.Write([]byte("Wrong data"))
			return
		}
		data := string(body)
		arr := strings.Split(data, ",")
		n := len(arr)
		nbChoice := make([]int, n)
		for i := 0; i < n; i++ {
			tmp, _ := strconv.ParseInt(arr[i], 10, 32)
			nbChoice[i] = int(tmp)
		}

		result := gametheory.SolvePart3(n, nbChoice)
		context.Writer.Write([]byte(result))
	})
	server.POST("/api/part4", func(context *gin.Context) {
		body, err := context.GetRawData()
		if err != nil {
			context.Writer.Write([]byte("Wrong data"))
			return
		}
		data := string(body)
		tmp := strings.Split(data, ";")

		permu := make([][]int, 27)
		for i := 0; i < 27; i++ {
			pts := strings.Split(tmp[i], ",")
			permu[i] = make([]int, 3)
			for j := 0; j < 3; j++ {
				tmp, _ := strconv.ParseInt(pts[j], 10, 32)
				permu[i][j] = int(tmp)
			}
		}

		result := gametheory.SolvePart4(3, []int{3,3,3}, permu)
		context.Writer.Write([]byte(result))
	})
	server.NoRoute(func(context *gin.Context) {
		context.HTML(200, "index.html",nil)
	})
	server.Run(":8082")
}