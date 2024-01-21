const favoritePerson = (req, res, next) => {
    res.json('Justin Walker');
}

const me = (req, res, next) => {
    res.json('Stephanie Ventura');
}

const motherlyPerson = (req, res, next) => {
    res.json('Maria Cruz');
}

module.exports = { me, favoritePerson, motherlyPerson}