
const fetch = require("node-fetch");
const URL = 'https://reddit.com/r/ACturnips/new.json?raw_json=1'
const Post = require('../models/Post');

async function fetchPosts(URL) {
    const response = await fetch(URL);
    const posts = await response.json();
    let post = posts.data.children[1].data //work with a group of posts not just one

    //clean and display data
    let title = post.title.slice(5)
    let price = post.title.replace(/[^0-9]/g, '')//modify method to get price
    let unixTime = post.created_utc
    let link = post.id
    //Failure if price isn't parsed
    //console.log("Title : " + title)
    //console.log("Price : " + price + " Bells")
    //console.log("Link : reddit.com/" + link)
    //console.log("Unix time of post : " + unixTime)


    return new Post({
        "title" : title,
        "price" : price,
        "link" : link
    });
}

/*(title) => {
    if(title.replace(/[^0-9]/g, '')){
        return title.replace(/[^0-9]/g, '');
    }

    change text to numbers
    
}
*/

module.exports = {
    posts : fetchPosts,
}