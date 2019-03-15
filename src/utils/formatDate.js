export default date => {
  let arr = date.split(":")
  return `${arr[0]}:${arr[1]}`
}