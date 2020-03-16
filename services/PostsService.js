export const append_text = (postObjs) => {
    for(let i=0;i<postObjs.length;i++) {
        postObjs[i].post = postObjs[i].post + "--- This post is created by " + postObjs[i].createdBy ;
    }
    return postObjs;
}