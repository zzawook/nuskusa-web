// returns the type message based on the notification type
export const getTypeMessage = (type: string, contentType: string) => {
    const firstType = type;
    const secondType = contentType;
    let message = "";
    if (firstType === "new") {
        message += "New "
        if (secondType === "board") {
            message += "board is created!"
        } else if (secondType === "post") {
            // Does not exist yet
        } else if (secondType === "comment") {
            message += "comment on your post!"
        } else if (secondType === "like") {
            message += "like on your post!"
        } else {
            throw new Error("Invalid second type argument for new type");
        }
    } else if (firstType === "update") {
        if (secondType === "comment") { // reply
            message += "Reply on your comment!";
        } else if (secondType === "reject") {
            message += "Post not approved."
        } else if (secondType === "approve") {
            message += "Post approved!"
        } else {
            throw new Error("Invalid second type argument for new type");
        }
    } else if (firstType === "verification") {
        if (secondType === "reject") {
            message += "Your student verification has been rejected."
        } else if (secondType === "approve") {
            message += "Your student verification is successfully approved!"
        } else {
            throw new Error("Invalid second type argument for new type");
        }
    } else {
        throw new Error("Nonexistent type message for notifications")
    }
    return message;
}