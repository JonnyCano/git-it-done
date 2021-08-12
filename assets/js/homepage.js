var getUserRepos = function(user) {
    fetch("https://api.github.com/users/" + user + "/repos").then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });

    console.log("outside");
};

// getUserRepos();

document.querySelector("#submit-btn").addEventListener("click", function(event) {
    // only called when user clicks the button
    console.log("hello 1");
});
   
setTimeout(function() {
// called after 5 seconds, regardless if button was clicked
console.log("hello 2");
}, 5000);

// called immediately on page load
console.log("hello 3");

// You can liken an API endpoint to a function in the sense that
// the same base URL can return different data depending on the argument(s) given.
// Consider the following examples:
getUserRepos("octocat"); // https://api.github.com/users/octocat/repos
getUserRepos("microsoft"); // https://api.github.com/users/microsoft/repos

// Or more generically:
// getUserRepos(user); // https://api.github.com/users/<user>/repos