const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require ('sequelize')
const { apply } = require('body-parser')
const path = require('path')


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sample.db',
    define:{
        timestamps: false
    }
})

sequelize.authenticate()
    .then(()=>console.log('we are connected'))
    .catch((error) => console.log(error))

const Ship = sequelize.define('ship', {
        name: Sequelize.STRING,
        displacement: Sequelize.STRING
    })

const Crewmember = sequelize.define('crewmember', {
        name: Sequelize.STRING,
        role: Sequelize.STRING
    })

Ship.hasMany(Crewmember)

const app = express()
app.use(bodyParser.json())

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({force: true})
        res.status(201).json({message: 'tables created'})
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.get('/ships', async (req, res) => {
    try {
        const ships = await Ship.findAll()
        res.status(200).json(ships)
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.post('/ships', async (req, res) => {
    try {
        const ship = req.body
        await Ship.create(ship)
        res.status(201).json({message: 'created'})
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.get('/ships/:sid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            res.status(200).json(ship)
        }
        else {
            res.status(404).json({message: 'not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.put('/ship/:sid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            await ship.update(req.body, {
                fields: ['name', 'displacement']
            })
            res.status(202).json({message: 'accepted'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.delete('/ships/:sid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            await ship.destroy()
            res.status(202).json({message: 'accepted'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.get('/ships/:sid/crewmembers', async(req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            const crewmembers = await crewmembers.getCrewmembers()
            res.status(200).json(crewmembers)
        }
        else {
            res.status(404).json({message: 'not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.post('/ships/:sid/crewmembers/:cid', async(req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            const crewmember = req.body
            crewmember.shipId = ship.id
            await Crewmember.create(crewmember)
            res.status(201).json({message: 'created'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.get('/ships/:sid/crewmembers/:cid', async(req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            const crewmembers = await Crewmember.getCrewmembers({ where: {
                id: req.params.cid
            }})
            const crewmember = crewmembers.shift()
            if(crewmember) {
                res.status(200).json(crewmember)
            }
            else {
                res.status(404).json({message: 'crew member not found'})
            }
            req.status(200).json(crewmembers)
        }
        else {
            res.status(404).json({message: 'ship not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.put('/ships/:sid/crewmembers/:cid', async(req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            const crewmembers = await Ship.getCrewmembers({ where: {
                id: req.params.cid
            }})
            const crewmember = crewmembers.shift()
            if(crewmember) {
                await crewmember.update(req.body)
                res.status(202).json({ message: 'accepted' })
            }
            else {
                res.status(404).json({message: 'crew member not found'})
            }
            req.status(200).json(crewmembers)
        }
        else {
            res.status(404).json({message: 'ship not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.delete('/ships/:sid/crewmembers/:cid', async(req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if(ship) {
            const crewmembers = await Ship.getCrewmembers({ where: {
                id: req.params.cid
            }})
            const crewmember = crewmembers.shift()
            if(crewmember) {
                await crewmember.destroy()
                res.status(202).json({ message: 'accepted' })
            }
            else {
                res.status(404).json({message: 'crew member not found'})
            }
            req.status(200).json(crewmembers)
        }
        else {
            res.status(404).json({message: 'ship not found'})
        }
        
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured' })
    }
})

app.listen(8080)