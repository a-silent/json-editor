export default string => {
  try {
	return (new Date(string).toISOString() === string)
  } catch (e) {
	return false
  }
}