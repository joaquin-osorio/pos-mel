export const cutString = (str, length) => {
  if (str.length > length) {
    return str.substring(0, length) + '...'
  } else {
    return str
  }
}

export const getDateArr = (date) => {
  if (!date) { // If there is no date, return today's date
    const today = new Date()
    return [today.getFullYear(), today.getMonth() + 1, today.getDate()]
  } else {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  }
}

export const arrToClipboard = (arr) => {
  const currentDate = new Date()
  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`
  const nonEmptyItems = arr.filter((item) => item !== '').length
  const totalItems = arr.length
  const modifiedArray = [formattedDate, nonEmptyItems, totalItems, ...arr]
  const strArr = modifiedArray.join('\t')
  navigator.clipboard
    .writeText(strArr)
    .then(() => console.log('Copied to clipboard!'))
}

export function replaceTitlesWithShortnames (array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    const item = array1[i]
    const shortnameItem = array2.find((x) => x.id === item.id)
    if (shortnameItem) {
      item.title = shortnameItem.shortname
    }
  }
  return array1
}

export function filterObjectsBySeller (originalArray, expectedSellers) {
  return originalArray.map((obj) => {
    if (expectedSellers.includes(obj.seller)) {
      return obj
    } else {
      return { title: '', seller: obj.seller }
    }
  })
}
