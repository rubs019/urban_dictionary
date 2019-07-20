export default text => {
    return JSON.stringify({
        '$regex': text,
        '$options': 'i'
    })
}