var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// reference the DOM elements
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    // we get the value from the <input> element via the nameInputEl DOM variable
    // and store the value in its own variable called username
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        // Notice this its called getting chained
        alert("Unable to connect to GitHub");
    });
    
};

var displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // apppen container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

// getUserRepos("JonnyCano");

// document.querySelector("#submit-btn").addEventListener("click", function(event) {
//     // only called when user clicks the button
//     console.log("hello 1");
// });
   
// setTimeout(function() {
// // called after 5 seconds, regardless if button was clicked
// console.log("hello 2");
// }, 5000);

// // called immediately on page load
// console.log("hello 3");

// // You can liken an API endpoint to a function in the sense that
// // the same base URL can return different data depending on the argument(s) given.
// // Consider the following examples:
// getUserRepos("octocat"); // https://api.github.com/users/octocat/repos
// getUserRepos("microsoft"); // https://api.github.com/users/microsoft/repos

// // Or more generically:
// // getUserRepos(user); // https://api.github.com/users/<user>/repos