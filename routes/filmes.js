const express = require('express')
const router = express.Router()
const Filme = require('../models/filme')

router.get('/api', (req, res) => {
    res.send('Api running...')
})

router.get('/', async (req, res) => {
    
    try {
        const filmes = await Filme.find()
        res.status(200).json(filmes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getFilme, (req, res) => {
    res.status(200).json(res.filme)
})

router.post('/', async (req, res) => {
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author
    })

    try {
        const newFilme = await filme.save()
        res.status(201).json(newFilme)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.put('/:id', getFilme, async (req, res) => {
    if(req.body.title != null){
        res.filme.title = req.body.title
        console.info('Filme title: ' + res.filme.title)
    }

    if(req.body.description != null){
        res.filme.description = req.body.description
        console.info('Filme description: ' + res.filme.description)
    }

    if(req.body.author != null){
        res.filme.author = req.body.author
        console.info('Filme author: ' + res.filme.author)
    }

    try {
        const updatedFilme = await res.filme.save()
        res.status(204).json(updatedFilme)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch('/:id', getFilme, async (req, res) => {
    
    if(req.body.title != null){
        res.filme.title = req.body.title
        console.info('Filme title: ' + res.filme.title)
    }

    try {
        const updatedFilme = await res.filme.save()
        res.status(204).json(updatedFilme)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', getFilme, async (req, res) => {
    
    try {
        await res.filme.remove()
        res.status(204).json({message: 'Deleted Filme'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getFilme(req, res, next){
    
    let filme
    
    try {
        const id = req.params.id
        const filmee = await Filme.findById(id)

        if(filmee == null){
            return res.status(404).json({message: 'Cannot find filme'})
        }

        console.info('Filmee: >>>>' + filmee)

        res.filme = filmee

        console.info('Filme: >>>>' + res.filme)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
    
    next()
}

module.exports = router