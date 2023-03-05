export const cutString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...'
  } else {
    return str
  }
} // Checked

export const getFormatedDate = (date) => {
  if (!date) {
    date = new Date()
  }
  return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
} // Checked

export const getDateArr = (date) => {
  if (!date) { // If there is no date, return today's date
    const today = new Date()
    return [today.getFullYear(), today.getMonth() + 1, today.getDate()]
  } else {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  }
} // Checked

export const formatArr = (arr) => {
  const currentDate = getFormatedDate()
  const nonEmptyItems = arr.filter((item) => item !== '').length
  const totalItems = arr.length
  return [currentDate, nonEmptyItems, totalItems, ...arr]
}

export const arrToClipboard = (arr) => {
  const strArr = arr.join('\t')
  navigator.clipboard
    .writeText(strArr)
}

// Obtengo la fecha actual
// Formateo la fecha actual
// Obtengo un array eliminando los items vacios
// Obtengo el total de items (incluyendo los vacios)
// Construyo un array con la fecha, el total de items y los items
// Convierto el array en un string separado por tabs
// Copio el string al clipboard

export const replaceTitlesWithShortnames = (itemsArray, shortnames) => {
  return itemsArray.map(item => {
    const index = shortnames.findIndex(x => x.id === item.id) // Return the index of the object with the same id (in shortnames)

    if (index >= 0) {
      return { ...item, title: shortnames[index].shortname }
    }
    return item
  })
} // Checked

export const filterObjectsBySeller = (originalArray, expectedSellers) => {
  return originalArray.map(obj => {
    return expectedSellers.includes(obj.seller) ? obj : { title: '', seller: obj.seller }
  })
} // Checked
