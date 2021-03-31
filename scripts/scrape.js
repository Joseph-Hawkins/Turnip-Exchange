const fetch = require("node-fetch");
const URL = 'https://reddit.com/r/ACturnips.json'

async function loadData(URL) {
    const response = await fetch(URL);
    const posts = await response.json();
    let post = posts.data.children[3].data
    console.log(post.author_fullname);
    console.log(() => { //get digit in title
        let title = post.title
        title = title.replace(/[^0-9]/g, '');
        return title;
    });
    //console.log(post)
    console.log(post.title.replace(/[^0-9]/g, ''))
    console.log(post.thumbnail);

    //set values for posts

    return posts;
}



const posts = loadData(URL);