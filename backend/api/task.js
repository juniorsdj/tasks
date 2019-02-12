const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {

        const date = req.query.date ? req.query.date :
            moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        const {
            description,
            estimateAt,
            doneAt
        } = req.body
        if (!description || !description.trim()) {
            return res.status(400).send('Descrição é obrigatório')
        }

        req.body.userId = req.user.id
        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) =>{
        app.db('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .del()
            .then(rowsDeleted =>{
                if(rowsDeleted > 0){
                    res.status(204).send()
                }else{
                    const msg = `Não foi encontrado uma task para o id ${req.params.id}`
                    res.status(400).send(msgn)
                }
            })
            .catch(err => res.status(400).json(err))
            
    }

    const updateTaskDoneAt = (req, res, DoneAt) =>{
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ DoneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) =>{
        app.db('tasks')
        .where({id: req.params.id, userId: req.user.id})
        .first()
        .then(task => {
            if(!task){
                const msg = `Task com id ${req.params.id} não encontrada`
                return (res.status(400).send(msg))
            }

            const doneAt = task.DoneAt ? null : new Date()
        
            updateTaskDoneAt(req,res, doneAt)
        })
        .catch(err => res.status(400).json(err))
    }

    return {getTasks,
            save,
            remove,
            toggleTask}
}