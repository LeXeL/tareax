const admin = require('firebase-admin')
const db = admin.firestore()
const moment = require('moment')

async function createPublicationInDatabase(publication) {
    return db
        .collection('publications')
        .doc()
        .set({
            category: publication.category,
            subcategory: publication.subcategory,
            service: publication.service,
            creationTime: Date.now(),
            price: publication.price,
            by: publication.by,
            userId: publication.userId,
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
                publications.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return publications
}
async function returnAllRecentPublications() {
    console.log('entra aqui')
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
    console.log(publications)
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
module.exports = {
    createPublicationInDatabase,
    deletePublicationInDatabase,
    returnAllPublicationsByUserId,
    returnAllPublicationsByService,
    returnAllRecentPublications,
}
