//this is the div where my profile info will appear
const overview = document.querySelector(".overview");
const username = "JoDepp";
const repoList = document.querySelector(".repo-list");

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
        fetchRepos();  //call the function below
};

const fetchRepos = async function() {   //select my repos and sort by recently updated up to 100
    const myRepos = await fetch(  `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const returnRepos = await myRepos.json();  //return json respons
    repoInfo(returnRepos);
   // console.log(returnRepos);
   repoInfo(returnRepos);
};

const repoInfo = function(repos) {  //using repos as the parameter allows the function to accept the data from last API call
    for( const repo of repos) {   //loop an create a list item of each repo
        const repoItem = document.createElement("li");   //creates a new HTML element
        repoItem.classList.add("repo");   //adds a new class
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);  //appends the list item to the global variable that selects the unordered repos list
    }
};
