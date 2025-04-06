const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form")
async function showPosts() {
    try{
        const response = await fetch("http://localhost:8080/api/posts");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const posts = await response.json();
        output.innerHTML = "";
        posts.forEach((post) => {
            const newpost = document.createElement("div");
            newpost.textContent = post.title;
            output.appendChild(newpost);
        });
    }
    catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        output.innerHTML = `<p>Error fetching posts: ${error.message}</p>`;
    }
}

//Submit new post
async function submitPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get("title");
    // const title = document.querySelector("#title").value;
    try {
        const response = await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const newPost = await response.json();
        const postEle = document.createElement("div");
        postEle.textContent = newPost.title;
        output.appendChild(postEle);
        showPosts();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

// Event listener for the button
button.addEventListener('click', showPosts);
// Event listener for the form submission
form.addEventListener("submit", submitPost);