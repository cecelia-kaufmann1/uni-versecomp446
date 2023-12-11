$(document).ready(function () {
    console.log("HI!!");
    // goToCG();

    $('#next_button').on('click', function() {
        console.log("WORKED??");
        goToSignUp();
    })

})

function goToSignUp() {
    $('#community_guidelines').css('display', 'none');
    $('#form').css('display', 'block');

    // $('#form').html(`
    // <h2>Sign up</h2>
    //   <form method="post">
    //     {% csrf_token %}
    //     {{ form.as_p }}
    //     <button type="submit">Sign Up</button>
    // </form>
    // `);
}

function goToCG() {
    $('#form').html(`
    <h1> Welcome To The Uni-Verse!</h1>
    <p> Before you join us, be sure to read the Community Guidelines to keep Uni-Verse a safe place! </p>

    <h2> Be Kind </h2>
    <h2> Have Fun </h2>

    `);
}