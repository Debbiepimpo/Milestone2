/**
 * Makes the contact form working and linked with an email address when the user sends a Enquiry
 * @param {HTML <form> } contactForm HTML  object which contains the infromation required to send the email
 * @return {boolean} a flag to indicate whether the operation finished or not
 */
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
    return false;  
}

