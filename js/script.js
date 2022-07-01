//this is the div where my profile info will appear
const overview = document.querySelector(".overview");
const username = "JoDepp";
const repoList = document.querySelector(".repo-list");
const myRepoInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const gitUserInfo = async function() {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`); //targets the "users" endpoint, the $ creates a placeholder
    const data = await userInfo.json();
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
        gitRepos();  //call the function below
};

const gitRepos = async function() {   //select my repos and sort by recently updated up to 100
    const myRepos = await fetch(  `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await myRepos.json();  //return json respons
    repoInfo(repoData);
};

const repoInfo = function (repos) {  //using repos as the parameter allows the function to accept the data from last API call
    for (const repo of repos) {   //loop an create a list item of each repo
        const repoItem = document.createElement("li");   //creates a new HTML element
        repoItem.classList.add("repo");   //adds a new class
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);  //appends the list item to the global variable that selects the unordered repos list
    }
};

repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {   //check if the element that was clicked on matches the <h3> element /name of the repo
        const repoName = e.target.innerText;  //targets the innerText where the event happens
      //console.log(repoName);
      repoSpecs(repoName);  //calling repoSpecs and passing repoName as an argument
    }
});

const repoSpecs = async function(repoName) {
    const eachRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);  //fetch request grabs repo specific info
    const repoInfo = await eachRepo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);  //fetching data from language property of my repoInfo
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];  //create an empty array to hold the languages
    for(const language in languageData){  //loop through the languageData object
        languages.push(language);  //adds the languages to the end of the array
    }
    displayRepoInfo(repoInfo, languages);  //call the function do display repo info and pass it the repoInfo object and languages array
};

const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";  //empty the the html of repo-data
    repoData.classList.remove("hide");  //shows the class of repoData
    myRepoInfo.classList.add("hide");  //hides teh element with the class of "repos"
    const div = document.createElement("div");  //create a new div
        div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(",")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        repoData.append(div);  //appends div to repoData
};