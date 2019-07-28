export default (text) => {
    return JSON.stringify({
        '$regex': text,
        '$options': 'i'
    });
};
//# sourceMappingURL=stringifyText.js.map