const admin = require('firebase-admin')
const db = admin.firestore()
const moment = require('moment')

const user = require('./users')

async function createPublicationInDatabase(publication) {
    return db
        .collection('publications')
        .doc()
        .set({
            title:
                publication.title.charAt(0).toUpperCase() +
                publication.title.slice(1),
            description: publication.description,
            category: publication.category,
            subcategory: publication.subcategory,
            service: publication.service,
            creationTime: Date.now(),
            price: publication.price,
            userId: publication.userId,
            allCountry: publication.allCountry,
            selectedAreas: publication.selectedAreas,
            selectedProvinces: publication.selectedProvinces,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function deletePublicationInDatabase(id) {
    return db
        .collection('publications')
        .doc(id)
        .delete()
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function returnAllPublicationsByUserId(id) {
    let publications = []
    await db
        .collection('publications')
        .where('userId', '==', id)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                publications.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return publications
}
async function returnAllPublicationsByService(id) {
    let users = await user.returnAllUsers()
    let publications = []
    await db
        .collection('publications')
        .where('service', '==', id)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                let obj = {...doc.data(), id: doc.id}
                obj.userId = users.filter(user => {
                    if (user.id === obj.userId) {
                        return user
                    }
                })[0]
                publications.push(obj)
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return publications
}
async function returnAllRecentPublications() {
    let publications = []
    await db
        .collection('publications')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                publications.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })

    publications.sort((a, b) => {
        return moment(b.creationTime).diff(a.creationTime)
    })
    publications = publications.filter((pub, i) => {
        if (i < 10) {
            return pub
        }
    })
    return publications
}
async function returnAllPublications() {
    let users = await user.returnAllUsers()
    let publications = []
    await db
        .collection('publications')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                let obj = {...doc.data(), id: doc.id}
                obj.userId = users.filter(user => {
                    if (user.id === obj.userId) {
                        return user
                    }
                })[0]
                publications.push(obj)
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })

    return publications
}
async function returnPublicationById(id) {
    return db
        .collection('publications')
        .doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                return doc.data()
            } else {
                console.log('Document no existe')
            }
        })
        .catch(error => {
            return error
        })
}
async function updatePublicationInfo(id, userObj) {
    return db
        .collection('publications')
        .doc(id)
        .update(userObj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
module.exports = {
    createPublicationInDatabase,
    deletePublicationInDatabase,
    returnAllPublicationsByUserId,
    returnAllPublicationsByService,
    returnAllRecentPublications,
    returnAllPublications,
    returnPublicationById,
    updatePublicationInfo,
}
