module.exports = (text, object = null) => {
	const log = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
	if (log) {
		object === null ? console.log(text) : console.log(text, object)
		return true
	}
	return false
}
