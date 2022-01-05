// returns the type message based on the notification type
export const getTypeMessage = (type: string) => {
    const typeArray = type.split("/");
    if (typeArray.length !== 2) {
        throw new Error("Type is invalid!")
    }
    const firstType = typeArray[0];
    const secondType = typeArray[1];
    let message = "";
    if (firstType === "new") {
        message += "New "
        if (secondType === "board") {
            message += "board is created!"
        }
        else if (secondType === "post") {
            // Does not exist yet
        }
        else if (secondType === "comment") {
            message += "comment on your post!"
        }
        else if (secondType === "like") {
            message += "like on your post!"
        } else {
            throw new Error("Invalid second type argument for new type");
        }
    } else {
        throw new Error("There is no update notification yet.")
        // if (secondType === "comment") { // reply
        //     message += "New reply on your comment!"
        // } else {
        // }
    }
    return message;
}