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
const publications = require('./lib/publications')

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
exports.ChangeUserVerified = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.changeVerified(
                req.body.uid,
                req.body.user
            )
            functions.logger.info('ChangeUserVerified', {
                userUid: req.body.uid,
                userInfo: req.body.user,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ChangeUserVerified', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnAllUsers = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await users.returnAllUsers()
            functions.logger.info('ReturnAllUsers')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllUsers', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

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
exports.ReturnAllCategories = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await categories.returnAllCategories()
            functions.logger.info('ReturnAllCategories')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllCategories', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
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
exports.ReturnAllSubCategories = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await subcategories.returnAllSubCategories()
            functions.logger.info('ReturnAllSubCategories')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllSubCategories', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
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
exports.ReturnAllServices = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await services.returnAllServices()
            functions.logger.info('ReturnAllServices')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllServices', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

//PUBLICATIONS
exports.CreatePublicationInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await publications.createPublicationInDatabase(
                    req.body.publication
                )
                functions.logger.info('CreatePublicationInDatabase', {
                    Publication: req.body.publication,
                })
                res.status(200).send({status: 'Created'})
            } catch (err) {
                functions.logger.error('CreatePublicationInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.DeletePublicationInDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await publications.deletePublicationInDatabase(req.body.id)
                functions.logger.info('DeletePublicationInDatabase', {
                    PublicationId: req.body.id,
                })
                res.status(200).send({status: 'Deleted'})
            } catch (err) {
                functions.logger.error('DeletePublicationInDatabase', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.ReturnAllPublicationsByUserId = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await publications.returnAllPublicationsByUserId(
                    req.body.id
                )
                functions.logger.info('ReturnAllPublicationsByUserId', {
                    UserId: req.body.id,
                })
                res.status(200).send({data: response})
            } catch (err) {
                functions.logger.error('ReturnAllPublicationsByUserId', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.ReturnAllPublicationsByService = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await publications.returnAllPublicationsByService(
                    req.body.id
                )
                functions.logger.info('ReturnAllPublicationsByService', {
                    UserId: req.body.id,
                })
                res.status(200).send({data: response})
            } catch (err) {
                functions.logger.error('ReturnAllPublicationsByService', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.ReturnAllRecentPublications = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await publications.returnAllRecentPublications()
                functions.logger.info('ReturnAllRecentPublications')
                res.status(200).send({data: response})
            } catch (err) {
                functions.logger.error('ReturnAllRecentPublications', {
                    error: err,
                })
                res.status(400).send({err: err})
            }
        })
    }
)
exports.ReturnAllPublications = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await publications.returnAllPublications()
            functions.logger.info('ReturnAllPublications')
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnAllPublications', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.ReturnPublicationById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await publications.returnPublicationById(req.body.id)
            functions.logger.info('ReturnPublicationById', {
                PublicationId: req.body.id,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('ReturnPublicationById', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})
exports.UpdatePublicationInfo = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await publications.updatePublicationInfo(
                req.body.id,
                req.body.publication
            )
            functions.logger.info('UpdatePublicationInfo', {
                PublicationId: req.body.id,
                PublicationObj: req.body.publication,
            })
            res.status(200).send({data: response})
        } catch (err) {
            functions.logger.error('UpdatePublicationInfo', {
                error: err,
            })
            res.status(400).send({err: err})
        }
    })
})

//SEEDS
exports.populateAuthUsers = functions.https.onRequest(async (req, res) => {
    if (!process.env['FUNCTIONS_EMULATOR']) {
        return res
            .status(403)
            .send(
                'ACCESS DENIED. This function is ONLY available via an emulator'
            )
    }
    const users = [
        //Admins
        {
            uid: 'jMlJOGMfCjbLfzSvvnOEg9MSsI22',
            email: 'alejandromillan29@live.com',
            password: 'Brewthers123!',
        },
        {
            uid: 'sWMNXNNG6ZTOFAhTMRPzSJ6BajE2',
            email: 'diego.r2892@gmail.com',
            password: 'Brewthers123!',
        },
        //Casas Cervezeras
        {
            uid: 'cxSfrUoR5oTCZEmRY3INCjRB1FG2',
            email: 'diego@lacasadediego.com',
            password: 'Brewthers123!',
        },
        {
            uid: 'sZtKjygXQuSmbp2sxuFNAhCd8Sk1',
            email: 'pablop@gmail.com',
            password: 'Brewthers123!',
        },
        //Restaurantes
        {
            uid: 'oXzRVhhJK3MMOgWu5AgwYGm7YYq1',
            email: 'darkslave@live.com',
            password: 'Brewthers123!',
        },

        {
            uid: 'vvN94b6TuBYJcmP7YHy6jnYo51t2',
            email: 'elrestaurantedediego@gmail.com',
            password: 'Brewthers123!',
        },
        // put all test users you want populated here
    ]

    const results = []
    const promises = []
    for (let user of users) {
        let promise = admin
            .auth()
            .createUser(user)
            .then(result => {
                return result
            })
            .catch(error => {
                return error.message // continue on errors (eg duplicate users)
            })

        promises.push(promise)
    }
    await Promise.all(promises).then(result => {
        results.push(result)
        return
    })
    res.header('Content-type', 'application/json')
    return res.status(200).send(JSON.stringify(results))
})
