const appRouter = require('express')()
const appController = require('../controller/appController')

appRouter.get('/', appController.getSeminars)
appRouter.delete('/delete/:id', appController.deleteSeminar)
appRouter.put('/edit', appController.editSeminar)

export default appRouter