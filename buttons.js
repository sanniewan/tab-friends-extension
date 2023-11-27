const addButton = document.getElementById("addButton");
const deleteButtons = document.querySelectorAll(".delete-button");
const stor = chrome.storage.sync;
// const itemNameInput = document.getElementById("itemName");

// Initialize saved group number if exists
stor.get("groupNumber").then((result) => {
    stor.set({groupNumber: result.groupNumber || 1});
  });

stor.get("groups", function(result) {
    if (!result.groups) {
      chrome.storage.sync.set({ groups: [] });
    }
  });


// Delete button event handler
function handleDelete(event) {  //event object automatically passed to func when event "click" occurs
    const listItem = event.target.closest("li");  //searches for nearest ancestor <li> element
    listItem.remove();
    const liTextContent = listItem.textContent;
    console.log("got to the textcontent: " + liTextContent);
    stor.get("groups", (result) => {
        const savedGroups = result.groups;
        console.log(savedGroups);
        updatedGroups = savedGroups.filter(item => {
            const x = item !==liTextContent.substr(0, liTextContent.length - 1);  //filter out the List item that deleted matches
            if(x){
            console.log(liTextContent);
            }
            return x;
        });
        console.log(updatedGroups);
        updateStorage(updatedGroups);
    });

}

const button = document.getElementById("addButton");
button.addEventListener("click", async () => {

    // const groupName = itemNameInput.value;
    //     if (groupName !== ""){
    //         const newGroup = "new group " + result.groupNumber; // You can customize group name based on user input
    //         savedGroups.push(newGroup);  // savedGroups: string array with new group name appended
    //     }else{

        //Get current number and add 1
        stor.get("groupNumber").then((result) => {
            console.log("current key val :" + result.groupNumber);
            result.groupNumber ++;
            stor.set({groupNumber: result.groupNumber}).then(() => {
                console.log("updated key val :" + result.groupNumber);
            });
        });
        //Add the new group name to Saved Groups array
        stor.get("groupNumber").then((result) => {
            const newGroup = "new group " + result.groupNumber; // You can customize group name based on user input
            console.log(newGroup);
            //Get the current array of groups and append new group
            stor.get("groups", (result) => {
                const savedGroups = result.groups;
                savedGroups.push(newGroup);  // savedGroups: string array with new group name appended
                updateStorage(savedGroups);
            });
        });
    // }
});

// Add Group button click event
/*
function addItem(){
    // const groupName = itemNameInput.value;
    // if (groupName !== ""){
        
    // }

    //Get current number and add 1
    stor.get("groupNumber").then((result) => {
        console.log("current key val :" + result.groupNumber);
        result.groupNumber ++;
        stor.set({groupNumber: result.groupNumber}).then(() => {
            console.log("updated key val :" + result.groupNumber);
        });
    });
    //Add the new group name to Saved Groups array
    stor.get("groupNumber").then((result) => {
        const newGroup = "new group " + result.groupNumber; // You can customize group name based on user input
        console.log(newGroup);
        //Get the current array of groups and append new group
        stor.get("groups", (result) => {
            const savedGroups = result.groups;
            savedGroups.push(newGroup);  // savedGroups: string array with new group name appended
            updateStorage(savedGroups);
        });
    });
    
}
*/

//Attach event listeners to existing delete buttons
deleteButtons.forEach(button => {
    button.addEventListener("click", handleDelete);
});


//General purpose function to update list
function updateStorage(savedGroups){
    stor.set({ groups: savedGroups });
    populateGroupList(savedGroups);
}