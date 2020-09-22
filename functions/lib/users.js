const admin = require('firebase-admin')
const db = admin.firestore()

async function createDatabaseWithUserInfo(user) {
    return db
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            creationTime: Date.now(),
            role: 'user',
            isVerified: false,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateDatabaseWithUserInfo(uid, obj) {
    return db
        .collection('users')
        .doc(uid)
        .update({
            name: obj.name,
            lastName: obj.lastName,
            contactPhone: obj.contactPhone,
            logs: [],
        })
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnUserById(uid) {
    return db
        .collection('users')
        .doc(uid)
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
async function updateUserInfo(uid, userObj) {
    return db
        .collection('users')
        .doc(uid)
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
async function changeVerified(uid, user) {
    return db
        .collection('users')
        .doc(uid)
        .update({isVerified: !user.isVerified})
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnAllUsers() {
    let users = []
    await db
        .collection('users')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                users.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return users
}

module.exports = {
    createDatabaseWithUserInfo,
    updateDatabaseWithUserInfo,
    returnUserById,
    updateUserInfo,
    changeVerified,
    returnAllUsers,
}
