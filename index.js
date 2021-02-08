const express = require('express')
let perpus = require('./db/book.json')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/api/v1/perpus', (req, res) => {
    res.status(200).json(perpus)
})

app.get('/api/v1/perpus/:id', (req, res) => {
    const terpilih = perpus.find(i => i.id == +req.params.id)
    res.status(200).json(terpilih)
})

app.post('/api/v1/perpus2', (req, res) => {
    console.log(req.body)
    const {
        isbn,
        judul,
        sinopsi,
        penulis,
        genre
    } = req.body


    const id = perpus[perpus.length - 1].id + 1
    const terpilih = {
        id,
        isbn,
        judul,
        sinopsi,
        penulis,
        genre
    }

    perpus.push(terpilih)
    res.status(201).json(perpus)
})

//Update
app.put('/api/v1/perpus/:id', (req, res) =>{
    let perpu = perpus.find(i => i.id == +req.params.id)

    const params = {isbn: req.body.isbn, judul: req.body.judul,
        sinopsi: req.body.sinopsi, penulis:req.body.penulis,genre:req.body.penulis}
        perpu={...perpu, ...params}
        
        perpus = perpus.map(i => i.id == perpu.id ? perpu : i)
        res.status(200).json(perpu)
})

//delete
app.delete('/api/v1/perpus/:id', (req, res) =>{
    perpus = perpus.filter(i => i.id !== +req.params.id)
    res.status(200).json({
        message: `Buku dengan id ${req.params.id} sudah berhasil di hapus!`, 
        perpus
    })
})

//update versi 2
// app.post('/api/v1/perpus3', (req, res) => {    

//     let lengthPerpus = perpus.length
    
//     console.log(req.body)
//     let changePerpus = []
//     for(i = 0;i < lengthPerpus;i++){
//         if(parseInt(req.body.id) === perpus[i].id){
//             const terpilih = {
//                 id : parseInt(req.body.id),
//                 isbn : req.body.isbn,
//                 judul : req.body.judul,
//                 sinopsi : req.body.sinopsi,
//                 penulis : req.body.penulis,
//                 genre : req.body.genre
//             }
//             changePerpus.push(terpilih)
//             console.log('masok')
//         }else{
//             changePerpus.push(perpus[i])
//         }
//     }

//     perpus = changePerpus
//     res.status(201).json(perpus)
// })



app.listen(3000, () => {
    console.log('Server ready')
})