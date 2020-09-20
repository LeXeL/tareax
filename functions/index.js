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
const categories = require('./lib/categories')
const subcategories = require('./lib/subcategories')
const services = require('./lib/services')

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
exports.UpdateUserInformationById = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await users.updateUserInfo(
                    req.body.uid,
                    req.body.user
                )
                functions.logger.info('UpdateUserInformationById', {
                    userUpdated: req.body.uid,
                    userInfo: req.body.user,
                })
                res.status(200).send({data: response})
            } catch (err) {
                functions.logger.error('UpdateUserInformationById', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)

//CATEGORIES
exports.CreateCategoryInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await categories.createCategoryInDatabase(req.body.category)
                functions.logger.info('CreateCategoryInDatabase', {
                    Category: req.body.category,
                })
                res.status(200).send({status: 'Created'})
            } catch (err) {
                functions.logger.error('CreateCategoryInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.DeleteCategoryInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await categories.deleteCategoryInDatabase(req.body.id)
                functions.logger.info('DeleteCategoryInDatabase', {
                    CategoryId: req.body.id,
                })
                res.status(200).send({status: 'Deleted'})
            } catch (err) {
                functions.logger.error('DeleteCategoryInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
//SUBCATEGORIES
exports.CreateSubCategoryInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await subcategories.createSubCategoryInDatabase(
                    req.body.subcategory
                )
                functions.logger.info('CreateSubCategoryInDatabase', {
                    SubCategory: req.body.subcategory,
                })
                res.status(200).send({status: 'Created'})
            } catch (err) {
                functions.logger.error('CreateSubCategoryInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.DeleteSubCategoryInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await subcategories.deleteSubCategoryInDatabase(req.body.id)
                functions.logger.info('DeleteSubCategoryInDatabase', {
                    SubCategoryId: req.body.id,
                })
                res.status(200).send({status: 'Deleted'})
            } catch (err) {
                functions.logger.error('DeleteSubCategoryInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
//SERVICES
exports.CreateServiceInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await services.createServiceInDatabase(req.body.service)
                functions.logger.info('CreateServiceInDatabase', {
                    Service: req.body.service,
                })
                res.status(200).send({status: 'Created'})
            } catch (err) {
                functions.logger.error('CreateServiceInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.DeleteServiceInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await services.deleteServiceInDatabase(req.body.id)
                functions.logger.info('DeleteServiceInDatabase', {
                    ServiceId: req.body.id,
                })
                res.status(200).send({status: 'Deleted'})
            } catch (err) {
                functions.logger.error('DeleteServiceInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
