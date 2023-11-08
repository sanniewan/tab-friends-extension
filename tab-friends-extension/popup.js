const groups = document.querySelector("#groups"); // Corrected selector
const groupList = document.querySelector("#groupList");

// Initialize storage
chrome.storage.sync.get("groups", (result) => {
    const savedGroups = result.groups || [];
    populateGroupList(savedGroups);
  });

// Populate group list
function populateGroupList(groups) { // groups = string array
    groupList.innerHTML = "";
    groups.forEach((group) => {

        //create new li
        const newLI = document.createElement("li");
        newLI.textContent = group;

        //create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", handleDelete);
        //append delete button to new li
        newLI.appendChild(deleteButton);

        //append button to li
        groupList.appendChild(newLI);

    });
  }
