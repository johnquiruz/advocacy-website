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

const addSignature = (person) => {
    // -------------------- Dynamic confirmation message -----------------------------
    // Declare values from pledge form
    // const name = document.querySelector("#pledge-name").value; // replaced by object "person"
    // const age = document.querySelector("#pledge-age").value; // replaced by object "person"

    // Insert into pledge form a confirmation message after submission
    const confirmMessage = "Hooray! Welcome to the team, " + person.name + ".";
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
        pledgeMessage = person.name + ", age " + person.age + ", just became a Space Guardian\n\n";
    }
    else if (randomNum == 2) {
        pledgeMessage = "Space Guardian " + person.name + ", age " + person.age + ", has joined\n\n";
    }
    else if (randomNum == 3) {
        pledgeMessage = "Welcome " + person.name + ", age " + person.age + ", our newest Space Guardian\n\n";
    }
    else if (randomNum == 4) {
        pledgeMessage = person.name + ", age " + person.age + ", pledged to keep Space clean\n\n";
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
    let person = {
        name: pledgeInput[0].value,
        age: pledgeInput[1].value,
        email: pledgeInput[2].value
    }

    // Error if input fields contains less than 1 characters
    for (let i = 0; i < pledgeInput.length - 1; ++i) { // - 1 because of checkbox
        if (pledgeInput[i].value.length < 1) {
            containsErrors = true;
            pledgeInput[i].classList.add("error");
        } else {
            pledgeInput[i].classList.remove("error");
        }
    }

    // Error if email input field does not contain correct format
    const email = document.querySelector("#pledge-email");

    if (!person.email.includes(".com")) {
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
        addSignature(person);
        toggleModal(person);
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



// ======================================= Scroll animation ========================================
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}

const revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;

        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active');
        } else {
            revealableContainers[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', reveal);



// ======================================= Toggle Modal ========================================
const toggleModal = (person) => {
    const modal = document.querySelector("#thanks-modal");
    const modalContent = document.querySelector("#thanks-modal-content");

    modal.style.display = "flex";
    modalContent.innerHTML = `<p>Stellar! Thank you ${person.name}! Welcome to the Space Guardians!`;

    setTimeout(() => {
        modal.style.display = "none";
    }, 4000)

}