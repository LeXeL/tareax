const admin = require('firebase-admin')
const db = admin.firestore()

async function createServiceInDatabase(service) {
    console.log(service)
    return db
        .collection('services')
        .doc()
        .set({
            name: service.name,
            category: service.category,
            subcategory: service.subcategory,
            creationTime: Date.now(),
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function deleteServiceInDatabase(id) {
    return db
        .collection('services')
        .doc(id)
        .delete()
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function returnAllServices() {
    let services = []
    await db
        .collection('services')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                services.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return services
}
module.exports = {
    createServiceInDatabase,
    deleteServiceInDatabase,
    returnAllServices,
}
