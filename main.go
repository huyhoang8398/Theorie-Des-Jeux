package main

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	game_theory "gitlab.zalopay.vn/zp-platform/game-theory-go/game-theory"
	"strconv"
)

func main() {
	var server = gin.New()
	server.LoadHTMLFiles("./build/index.html")
	server.Use(static.Serve("/static", static.LocalFile("./build/static", false)))
	server.GET("/api/part1", func(context *gin.Context) {
		a00, _ := strconv.ParseInt(context.Query("A00"), 10, 32)
		a01, _ := strconv.ParseInt(context.Query("A01"), 10, 32)
		a10, _ := strconv.ParseInt(context.Query("A10"), 10, 32)
		a11, _ := strconv.ParseInt(context.Query("A11"), 10, 32)

		b00, _ := strconv.ParseInt(context.Query("B00"), 10, 32)
		b01, _ := strconv.ParseInt(context.Query("B01"), 10, 32)
		b10, _ := strconv.ParseInt(context.Query("B10"), 10, 32)
		b11, _ := strconv.ParseInt(context.Query("B11"), 10, 32)

		pA := [][]int{{int(a00), int(a01)}, {int(a10), int(a11)}}
		pB := [][]int{{int(b00), int(b01)}, {int(b10), int(b11)}}

		result := game_theory.Solve(pA, pB)
		context.Writer.Write([]byte(result))
	})
	server.NoRoute(func(context *gin.Context) {
		context.HTML(200, "index.html",nil)
	})
	server.Run(":8082")
}