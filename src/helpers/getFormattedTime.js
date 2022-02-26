function getFormattedTime(secs) {
  const minutes = Math.floor(secs / 60)
  let seconds = Math.floor(secs - (minutes*60))
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export { getFormattedTime }