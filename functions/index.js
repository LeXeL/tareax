const functions = require('firebase-functions')
const admin = require('firebase-admin')

var serviceAccount = require('./credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://tareax-bfce8.firebaseio.com',
})

const cors = require('cors')({
    origin: true,
})
const users = require('./lib/users')
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', {structuredData: true})
    response.send('Hello from Firebase!')
})
exports.createUserOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.createDatabaseWithUserInfo(req.body.user)
            functions.logger.info('createDatabaseWithUserInfo', {
                userCreated: req.body.user,
            })
            res.status(200).send({status: 'Created'})
        } catch (err) {
            functions.logger.error('createDatabaseWithUserInfo', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

exports.updateUserWithInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await users.updateDatabaseWithUserInfo(req.body.uid, req.body.obj)
            functions.logger.info('updateDatabaseWithUserInfo', {
                userUpdated: req.body.uid,
                userInfo: req.body.obj,
            })
            res.status(200).send({status: 'Updated'})
        } catch (err) {
            functions.logger.error('updateUserWithInfo', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

exports.getUserInformationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.returnUserById(req.body.uid)
            functions.logger.info('getUserInformationById', {
                userUpdated: req.body.uid,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('getUserInformationById', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
