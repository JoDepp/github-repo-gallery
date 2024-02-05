
const filterInput = document.querySelector(".filter-repos");
const myRepoInfo = document.querySelector(".repos"); //selects repos where all repo info appears
const overview = document.querySelector(".overview"); //selects div with class overview
const repoList = document.querySelector(".repo-list"); //select UL to display repo list
const repoData = document.querySelector(".repo-data"); //repo-data is where individual repo data will appear
const username = "JoDepp"; //github user name
const viewReposButton = document.querySelector(".view-repos");

//1st async function fetches info from my github profile using API address and JSON
const gitUserInfo = async function() {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`); // githubs api address targets the "users" endpoint, the $ creates a placeholder
    const data = await userInfo.json();  //tells program to wait until API data is received from JSON
    displayUserInfo(data); //logs out response to the console
};
gitUserInfo();  //call this function to see results

//Function to fetch and display my info from github
const displayUserInfo = function (data) {       //fucntion accepts the JSON data as a parameter
    const div = document.createElement("div");  // creates a new div with a class of user-info
    div.classList.add("user-info");
    //populate the new div with elements
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
        gitRepos();  //call the async function below
};

//select my repos and sort by the most recently updated 100 repos
const gitRepos = async function() {   
    const myRepos = await fetch(  `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await myRepos.json();  //return json response
    repoInfo(repoData);
};

//function to display info about each repo
const repoInfo = function (repos) {  //using repos as the parameter allows the function to accept the data from last API call
    filterInput.classList.remove("hide");  //displays the input element
    for (const repo of repos) {   //loop and create a list item for each repo
        const repoItem = document.createElement("li");   //creates a new HTML element
        repoItem.classList.add("repo");   //adds a new class
        repoItem.innerHTML = `<h3>${repo.name}</h3>`; //add an h3 element to our html with the name of the repo
        repoList.append(repoItem);  //appends the repoItem to the global variable that selects the unordered repoList
    }
};

//click event 
repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {   //conditional statement to check if the element that was clicked on matches the <h3> element /name of the repo
        const repoName = e.target.innerText;  //targets the innerText where the event happens
      //console.log(repoName);
      repoSpecs(repoName);  //calling repoSpecs from below and passing repoName as an argument
    }
});

//function to get specific repo info
const repoSpecs = async function(repoName) {
    const eachRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);  //fetch request grabs repo specific info
    const repoInfo = await eachRepo.json();  //repoInfo will resolve and save the JSON response
    console.log(repoInfo); //logging out repoInfo
    const fetchLanguages = await fetch(repoInfo.languages_url);  //fetching data from language_url of my repoInfo
    const languageData = await fetchLanguages.json(); 
    console.log(languageData);
    const languages = [];  //an empty array to hold the languages
    for(const language in languageData){  //loop through the languageData object
        languages.push(language);  //adds the languages to the end of the array
    }
    displayRepoInfo(repoInfo, languages);  //call the function to display repo info and pass it the repoInfo object and languages array
};

//function to display specific repo info//
const displayRepoInfo = function(repoInfo, languages) {
   viewReposButton.classList.remove("hide");  
    repoData.innerHTML = "";  //empty the the html of repo-data
    repoData.classList.remove("hide");  //shows the class of repoData
    myRepoInfo.classList.add("hide");  //hides the element with the class of "repos"
    const div = document.createElement("div");  // div to add selected repos name, description, branch and link to its github code
        div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>                   
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(",")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        repoData.append(div);  //appends div to repoData
};

viewReposButton.addEventListener("click", function () {  //click event related to the Back to Repo button
    myRepoInfo.classList.remove("hide");    //displays the .repos class where all repo info appears
    repoData.classList.add("hide");         //hides the individual repo data
    viewReposButton.classList.add("hide");  //hides the 'back to repo' button
});

//adds an Input Event to the Search Box creating Dynamic Search
filterInput.addEventListener("input", function(e) { //attaches input to filterInput and passes the event(e) to the callback function
    const searchBoxText = e.target.value; //variable captures the value of the search text 
    const repos = document.querySelectorAll(".repo"); //selects all elements on the page with a class of repo
    const searchToLower = searchBoxText.toLowerCase(); //assigned lowercase value of the search text


for(const repo of repos) {    //loop to reassign the lowercase search text
    const lowerInnerText = repo.innerText.toLowerCase(); 
    if(lowerInnerText.includes(searchBoxText)) {  //see if lowercase repo text includes the lowercase search text
        repo.classList.remove("hide");  //if it does, show the repos that match the text you typed into the input
    } else {
        repo.classList.add("hide");   //if it doesn't, hide those repos
    }
}
});