export default color => {
  const reg = /#[a-f0-9]{6}\b/gi
  return reg.test(color)
}