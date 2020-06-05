const express = require("express")
const server = express()

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (requisition, response) => {
    return response.render("index.html", {
        title: "Um título."
    })
})

server.get("/create-point", (requisition, response) => {
    return response.render("create-point.html")
})

server.get("/search", (requisition, response) => {
    return response.render("search-results.html")
})

server.listen(3000)