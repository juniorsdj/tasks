const {
    authSecret
} = require('./../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        const {
            email,
            password
        } = req.body
        if (!email || !password)
            return res.status(400).send('E-mail ou senha incorretos')

        const user = await app.db('users')
            .where({
                email
            })
            .first()
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send()
                }
                const payload = {
                    id: user.id
                }
                res.json({
                    name: user.nome,
                    email: user.email,
                    token:  jwt.encode(payload, authSecret)
                })
            })
        }else{
            res.status(400).send('Problemas com o login do usuário')
        }

    }


    return {
        signin
    }
}