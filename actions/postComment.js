const postComment = async (userData) => {
  const {
    userName,
    userId,
    comment: { comment },
  } = userData;
  try {
    let res = await fetch("https://localhost:3000/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        comments: comment,
        userName: userName,
      }),
    });
    res = await res.json();

    if (res.error) {
      return "error";
      // throw new Error(`Failed to add event: ${res.status} - ${res.statusText}`);
    }
    if (res.success) {
      return res;
    }
  } catch (error) {
    return "error";
  }
};

export default postComment;
