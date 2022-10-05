// Change format of date (for user profil for example)
export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    seconde: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  let timestamp = Date.parse(num)

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options)

  return date.toString()
}

export const timestampParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    seconde: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  let date = new Date(num).toLocaleDateString("fr-FR", options)
  return date.toString()
}

// Check if value is empty. Return true if one of this condition is checked.
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  )
}
