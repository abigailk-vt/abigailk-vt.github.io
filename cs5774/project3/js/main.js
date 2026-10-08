//This file is the main.js for the simulated search results for Kit Central.
$(function () {
  const parameters = new URLSearchParams(window.location.search);
  
  //Search Bar section
  if ($('#search-results').length && parameters.has('q')) {
    const keyphrase = parameters.get('q') || '';
    $('#search-results').empty();
    $('#browse-heading').text('Search Results');
    $('.filter-panel, .active-filter-row').hide();
    $('.search-form input[name="q"]').val(keyphrase);
    //keyphrase is "Luka Modric", and then converted to lowercase so that user can type in whatever case and it would still show
    if (keyphrase.trim().toLowerCase() === 'luka modric') {
      $('#search-summary').text('2 simulated results for “' + keyphrase + '”.');
      //shows 2 search results that are clickable
      const results = [
        {
          image: 'images/puma-luka-modric-mens-ac-milan-home-jersey-w-champions-league-patches-2526-redblack-soccerwearhouse-2754337_5000x.webp',
          alt: 'AC Milan 25/26 home jersey with Modric on the back',
          year: '2025-2026',
          title: 'AC Milan 25/26 Home Jersey - Luka Modric'
        },
        {
          image: 'images/il_1588xN.7621512097_23gj.webp',
          alt: '2009-2010 Tottenham signed home shirt Luka Modrić',
          year: '2009-2010',
          title: 'Tottenham Signed Home Shirt Luka Modrić'
        }
      ];
      // for each result, display the card with the image of the jersey, year, and title 
      $.each(results, function (index, result) {
        const card = $('<article>').addClass('product-card');
        const link = $('<a>').attr('href', 'detail.html');
        $('<img>').attr({src: result.image, alt: result.alt}).appendTo(link);
        $('<div>').addClass('card-body').append(
          $('<span>').addClass('card-meta').text(result.year),
          $('<span>').addClass('card-title').text(result.title)
        ).appendTo(link);
        card.append(link).appendTo('#search-results');
      });
      //if user did not type "luka modric", then it will show no results and to try the simulated result. 
    } else {
      $('#search-summary').text(keyphrase.trim() ? 'No results for “' + keyphrase + '”. Try Luka Modric to see a simulated result.' : 'Enter Luka Modric in the search box to see a simulated result.');
    }
  }

//comments section for detail.html : 1 of 2 additional feature
  $('.comments').on('submit', '.comment-form', function (event) {
    event.preventDefault();
    const input = $('#comment-text');
    const comment = input.val().trim();
    if (!comment) {
      input.val('').focus();
      return;
    }
    // appends the comment to the page, simulating a new addition
    $('<li>').append(
      $('<strong>').text('Commenter67 (You)'),
      $('<p>').text(comment)
    ).appendTo('.comments-list');
    $('#comments-heading').text('Comments (' + $('.comments-list li').length + ')');
    input.val('').focus();
  });

  //favorites checkbox for detail.html : 2 of 2 additional feature
  $('.favorite-toggle').on('change', function () {
    const checkbox = $(this);
    const controls = checkbox.closest('.favorite-controls');
    const jersey = controls.closest('article');
    const favorited = checkbox.prop('checked');
    //this control the state of the checkbox, if clicked, it will change to favorited and then vice versa
    controls.find('.favorite-state').text(favorited ? 'Favorited' : 'Not favorited');
    jersey.toggleClass('is-favorite', favorited);
    controls.find('.favorite-notice').remove();
    $('<p>').addClass('favorite-notice').attr('role', 'status')
      .text(favorited ? 'This jersey was added to your favorites for this visit.' : 'This jersey was removed from your favorites.')
      .appendTo(controls);
  });
});
