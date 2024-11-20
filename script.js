// ================================== Toggle light and dark ===================================
const themeToggle = document.querySelector("#theme-toggle");

const toggleTheme = () => {
    document.body.classList.toggle("theme-mode"); // add a class called 'theme-mode'
}                                                 // to the body tag

themeToggle.addEventListener("click", toggleTheme);




// ======================================= Pledge Form ========================================
const pledgeSubmit = document.querySelector("#pledge-button");
let count = 0; // pledge counter starts at 0


// This function displays a dynamic confirmation message upon submitting
// a pledge form, updates a live feed of pledge recipients, and keeps
// count of everyone who has pledged

const addSignature = () => {
    // -------------------- Dynamic confirmation message -----------------------------
    // Declare values from pledge form
    const name = document.querySelector("#pledge-name").value;
    const age = document.querySelector("#pledge-age").value;

    // Insert into pledge form a confirmation message after submission
    const confirmMessage = "Hooray! Welcome to the team, " + name + ".";
    let confirmation = document.querySelector("#confirmation-message");
    confirmation.innerText = confirmMessage;


    // -------------------- Proliferate pledge live feed  -----------------------------
    // Declare signature list and create paragraph element for signature
    const liveFeed = document.querySelector("#live-feed");
    const signature = document.createElement("p");

    // Randomize pledge message to be added to the live feed
    let randomNum = Math.floor(Math.random() * (4) + 1);
    let pledgeMessage = "";

    if (randomNum == 1) {
        pledgeMessage = name + ", age " + age + ", just became a Space Guardian\n\n";
    }
    else if (randomNum == 2) {
        pledgeMessage = "Space Guardian " + name + ", age " + age + ", has joined\n\n";
    }
    else if (randomNum == 3) {
        pledgeMessage = "Welcome " + name + ", age " + age + ", our newest Space Guardian\n\n";
    }
    else if (randomNum == 4) {
        pledgeMessage = name + ", age " + age + ", pledged to keep Space clean\n\n";
    }

    // Add pledge message to the live feed
    signature.innerText = pledgeMessage;
    liveFeed.appendChild(signature);


    // -------------------------- Pledge counter  -----------------------------
    // Reserve inline space in pledge form to display pledge count
    let numPledges = document.querySelector("#pledge-counter");
    count += 1;
    numPledges.innerText = count;

}



// =================================== Pledge Form validation ====================================
const pledgeForm = document.querySelector("#pledge-form");

const validateForm = (event) => {
    event.preventDefault();

    // Cannot display confirmation message until a valid input is submitted
    let confirmation = document.querySelector("#confirmation-message");
    confirmation.innerText = "";

    let containsErrors = false; // error flag
    let pledgeInput = pledgeForm.elements; // store to check each input element

    // Error if input fields contains less than 2 characters
    for (let i = 0; i < pledgeInput.length - 1; ++i) {
        if (pledgeInput[i].value.length < 1) {
            containsErrors = true;
            pledgeInput[i].classList.add("error");
        } else {
            pledgeInput[i].classList.remove("error");
        }
    }

    // Error if email input field does not contain correct format
    const email = document.querySelector("#pledge-email");

    if (!email.value.includes(".com")) {
        containsErrors = true;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }

    // Error if Hero checkbox is not checked
    const pledged = document.querySelector("#pledge-hero");

    if (!pledged.checked) {
        containsErrors = true;
        pledged.classList.add("error");
    } else {
        pledged.classList.remove("error");
    }

    // Submit the form if there are no errors present
    if (!containsErrors) {
        addSignature();
        console.log("Form was successfully submitted.");

        // clear fields
        for (let i = 0; i < pledgeInput.length; i++) {
            if (pledgeInput[i].type === "checkbox") {
                pledgeInput[i].checked = false; // reset checkbox
            } else {
                pledgeInput[i].value = "";
            }
            pledgeInput[i].classList.remove("error"); // reset error class
        }
    } else {
        console.log("Form was not submitted.");
    }
}

pledgeSubmit.addEventListener("click", validateForm); // validate form and submit if there are no errors



