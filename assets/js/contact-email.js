/*----This is required to makes the contact form working and linked with an email address when the user sends a Enquiry----*/

function sendMail(contactForm) {
    emailjs.send("default_service", "isles", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "enquiry": contactForm.enquiry.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}

