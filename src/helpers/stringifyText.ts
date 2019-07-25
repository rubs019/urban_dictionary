export default (text: string): string => {
    return JSON.stringify({
        '$regex': text,
        '$options': 'i'
    })
}
