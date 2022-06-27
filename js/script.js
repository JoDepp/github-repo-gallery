//this is the div where my profile info will appear
const overview = document.querySelector(".overview");
const username = "JoDepp";

const gitUserInfo = async function() {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`); //targets the "users" endpoint, the $ creates a placeholder
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};
gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");  // creates a new div with a class of user-info
    div.classList.add("user-info");
    div.innerHTML = `    
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
        `;
        overview.append(div);  //append the div to the overview element
};