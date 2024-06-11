
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const mongoose = require('mongoose')
const Game = require('./models/game')

mongoose.connect('mongodb://localhost/parking-webapp', {})

const results = []

try {
    fs.createReadStream(path.join(__dirname, 'cubs_home_games', '2024_cubs_home_games.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                for (const game of results) {
                    const [month, day, year] = game.date.split('/')
                    const formattedDate = new Date(`${year}-${month}-${day}`)
                    const newGame = new Game({
                        date: formattedDate,
                        time: game.time,
                        opponent: game.opponent,
                        availableReservations: 10
                    })
                    await newGame.save()
                }
                console.log('Games successfully saved to the database.')
                } catch (error) {
                    console.error('Error saving games to the database:', error)
                } finally {
                    mongoose.connection.close()
                }
        })
} catch (err) {
    console.log(err)
}
