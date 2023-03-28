const dateAndTime = (date) => {
    const dateAndTimeZone= date.split('.')
    const dateAndTime= dateAndTimeZone[0].split('T')
    return dateAndTime[0]+' '+dateAndTime[1]
}

export default {dateAndTime}