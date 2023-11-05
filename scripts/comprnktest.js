const query = window.location.search
const urlParams = new URLSearchParams(query);
const product = urlParams.get('hi')

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        $("h1").text(product)
    }
});