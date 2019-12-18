
let queryUrl = 'http://quotes.rest/qod.json?category=inspire';

$.ajax ({
    url: queryUrl,
    method: 'GET'
}).then(function(response){
    console.log('JENNA LOOK HERE' + response);
    let quote = response.contents.quotes[0].quote;
    let author = response.contents.quotes[0].author;

    $('#quoteArea').html(quote);
    $('#quoteAuthor').html(author);
});

