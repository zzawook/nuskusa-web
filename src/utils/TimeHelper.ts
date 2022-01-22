import firebase from "firebase"

const timestampToCommentDateString = (timestamp: firebase.firestore.Timestamp) => {
    const date = timestamp.toDate();
    const currentDate = new Date();
    const diffHour = (currentDate.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffHour * 60 < 1) {
        return "Just now";
    } else if (diffHour < 1) { // minutes(s) ago
        return Math.ceil((currentDate.getTime() - date.getTime()) / (1000 * 60)) + " minutes ago";
    } else if (diffHour < 2) { // hour(s) ago
        return "1 hour ago";
    } else if (diffHour < 24) {
        return Math.floor(diffHour) + " hours ago";
    } else if (diffHour < 48) { // day(s) ago
        return "1 day ago";
    } else if (diffHour < 168) {
        return Math.floor(diffHour / 24) + " days ago";
    } else if (diffHour < 336) { // week(s) ago
        return "1 week ago";
    } else if (diffHour < 720) { // maximum 4 weeks
        return Math.floor(diffHour / 24 / 7) + " weeks ago";
    } else if (diffHour < 1440) { // month(s) ago
        return "1 month ago";
    } else if (diffHour < 8640) {
        return Math.floor(diffHour / 24 / 7 / 4.28) + " months ago";
    } else if (diffHour < 17520) { // assume 30 days a month
        return "1 year ago";
    } else {
        return Math.floor(diffHour / 24 / 30 / 12) + " years ago";
    }
}

export {
    timestampToCommentDateString,
}