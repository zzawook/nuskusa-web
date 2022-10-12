const DateToPrevString = (time: Date) => {
    const timeFromNow = (Date.now() - time.getTime()) / 1000;
    const minutesFromNow = Math.floor(timeFromNow / 60)
    const hoursFromNow = Math.floor(timeFromNow / (60 * 60))
    if (hoursFromNow >= 1 && hoursFromNow < 24) {
        return hoursFromNow.toString() + " hours ago"
    }
    else if (minutesFromNow >= 1 && minutesFromNow < 60) {
        return minutesFromNow.toString() + " minutes ago"
    }
    else if (minutesFromNow <= 1) {
        return 'Just now'
    }
    else {
        return monthToString(time.getMonth() + 1) + " " + time.getDate().toString() + " " + time.getFullYear().toString();
    }
}

const monthToString = (month: number) => {
    if (month == 1) {
        return "Jan";
    }
    else if (month === 2) {
        return "Feb";
    }
    else if (month === 3) {
        return "Mar";
    }
    else if (month === 4) {
        return "Apr";
    }
    else if (month === 5) {
        return "May";
    }
    else if (month === 6) {
        return "Jun"
    }
    else if (month === 7) {
        return 'Jul'
    }
    else if (month === 8) {
        return 'Aug';
    }
    else if (month === 9) {
        return 'Sep'
    }
    else if (month === 10) {
        return 'Oct'
    }
    else if (month === 11) {
        return 'Nov'
    }
    else if (month === 12) {
        return "Dec"
    }
    else {
        return 'Invalid Month'
    }
}

export {
    DateToPrevString,
}