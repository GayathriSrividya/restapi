const fs =  require('fs')

function fromFile(req, res)
{
 try{
    const data = fs.readFileSync('../products.json', 'utf-8')
    if(data.length==0){
        res.status(400)
        return 'no products available to display'
    }
    else{
        
        res.status(200)
        return JSON.parse(data)
    }  
 }
 catch(err){
    res.status(404)
    return err
 }
}


function filter(req, res){
    const data= fromFile(req, res)
    try{
        const product=data.find(prod=>prod.id == parseInt(req.params.id))
        if(!product){
            res.status(400)
            return`product with id '${req.params.id}' not found`
        } 
        res.status(200)
        return product
        }
        catch(err){
            res.status(404)
            return data
        }
}


function toFile(req, res){
    const newEntry =  {
        id : req.body.id,
        name : req.body.name,
        price : req.body.price
    }
    let oldProd= JSON.parse(JSON.stringify(fromFile(req, res)))
    let newProd=JSON.parse(JSON.stringify(newEntry))
    const checkId = oldProd.find(entry=>entry.id==parseInt(req.body.id))
    if(!checkId){
    oldProd.push(newProd)
    fs.writeFile('../products.json', JSON.stringify(oldProd), (err, data)=>{
        if(err){
            res.send('an error occured')
            return err
        }
    })
    res.status(200)
    return `entry added successfully, ${JSON.stringify(newEntry)}`
    }
    else{
    res.status(400)
    res.send(`product with id '${req.body.id}' already exists`)
}}


module.exports.toFile=toFile
module.exports.fromFile=fromFile
module.exports.filter=filter