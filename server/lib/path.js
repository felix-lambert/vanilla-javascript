const getExtension = filename => {
  let i = filename.lastIndexOf('.')
  return (i < 0) ? -1 : filename.substr(i)
}

module.exports = getExtension
