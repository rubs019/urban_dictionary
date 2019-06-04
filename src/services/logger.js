module.exports = (text, object) => {
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		console.log(text, object)
		return true
	}
	return false
}
