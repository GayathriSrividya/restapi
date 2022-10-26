const express = require('express')
const app=express()
app.use(express.json())
const readData=require('./fileHandling.js')


app.get('/', (req, res) => {
res.send('hello, welcome to our product catalog.')
})


app.get('/products', (req, res)=>{
    res.send(readData.fromFile(req, res))
})


app.get('/products/:id', (req, res)=>{
     res.send(readData.filter(req, res))
})


app.post('/products/add', (req, res)=>{
    
     res.send(readData.toFile(req, res))
    })


app.listen(8080, ()=>
{
    console.log(`listening on port 8080...`)
})