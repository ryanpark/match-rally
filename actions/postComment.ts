interface userDataTypes {
  userName: string;
  userId: string;
  email: string;
  comment: {
    comment: string;
  };
}

interface ResponseType {
  error: boolean;
  success: boolean;
}

const postComment = async (userData: userDataTypes) => {
  const {
    userName,
    userId,
    email,
    comment: { comment },
  } = userData;
  try {
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        comments: comment,
        userName: userName,
        email: email,
      }),
    });
    const res: ResponseType = await response.json();

    if (res.error) {
      throw new Error(`Failed to post comment`);
    }
    if (res.success) {
      return res;
    }
  } catch (error) {
    return error;
  }
};

export default postComment;
