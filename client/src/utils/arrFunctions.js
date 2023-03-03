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
