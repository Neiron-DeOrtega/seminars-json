const fs = require('fs')

class AppController {
    async getSeminars(req, res) {
        try {
            const json = JSON.parse(fs.readFileSync('seminars.json'))
            return res.status(200).send(json.seminars)
        } catch (error) {
            return res.status(400).send(error.message) 
        }
    }

    async deleteSeminar(req, res) {
        try {
            const {id} = req.params

            const json = JSON.parse(fs.readFileSync('seminars.json'))
            const isSeminarExists = json.seminars.find((sem) => {
                return Number(sem.id) === Number(id)
            })
            if (!isSeminarExists) {
                return res.status(404).send({ message: 'Seminar not found' })
            }
            const newSeminars = json.seminars.filter((sem) => {
                return Number(sem.id) !== Number(id)
            })

            fs.writeFile('seminars.json', JSON.stringify({seminars: newSeminars}), (err) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({ message: 'Error deleting seminar' })
                }
                return res.status(200).send({ message: 'Seminar deleted successfully', newSeminars })
            })

        } catch (error) {
            return res.status(500).send({ message: 'Error deleting seminar' })
        }
    }

    async editSeminar(req, res) {
        try {
            const { newSeminar } = req.body

            if (!newSeminar) {
                return res.status(400).send({ message: 'Ошибка отправки данных' })
            }

            const json = JSON.parse(fs.readFileSync('seminars.json'))
            const seminar = json.seminars.find((sem) => {
                return (Number(sem.id) === Number(newSeminar.id)) 
            })
            if (!seminar) {
                return res.status(404).send({ message: 'Seminar not found' })
            }
            const seminarIndex = json.seminars.indexOf(seminar)
            json.seminars.splice(seminarIndex, 1, newSeminar)

            fs.writeFile('seminars.json', JSON.stringify({seminars: json.seminars}), (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error editing seminar' })
                }
                return res.send({ message: 'Seminar edited successfully', newSeminars: json.seminars })
            })

        } catch (error) {
            return res.status(500).send({ message: 'Error editing seminar' })
        }
    }
}

module.exports = new AppController()