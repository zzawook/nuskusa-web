// returns the type message based on the notification type
export const getTypeMessage = (type: string, data: any) => {
    let message = "";
    if (type === "CommentOnPost") {
        message += "Comment on your post!"
    }
    else if (type === "CommentOnComment") {
        message += "Comment on your comment!"
    } 
    else if (type === "MultipleUpvoteOnPost") {
        message += data.count + "people liked your post!"
    } 
    else if (type === "UpvoteOnPost") {
        message += "New like on your post!"
    } 
    else if (type === "MultipleUpvoteOnComment") {
        message += data.count + "people liked your comment!"
    }
    else if (type === "UpvoteOnComment") {
        message += "New like on your comment!"
    }
    else {
        throw new Error("Nonexistent type message for notifications")
    }
    return message;
}