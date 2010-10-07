/**
 *  @author Victor Pantoja
 */
 
jQuery.logIn = function(){
    var scope = 'http://www.google.com/m8/feeds';
    var token = google.accounts.user.login(scope);
};

jQuery.getContacts = function(){
	// Create the contacts service object
	var contactsService = new google.gdata.contacts.ContactsService('<your-app>');
	var feedUri = 'http://www.google.com/m8/feeds/contacts/default/full';
	var query = new google.gdata.contacts.ContactQuery(feedUri);

	// Set the maximum of the result set to be 1000
	query.setMaxResults(1000);
    query.setSortOrder('ascending');
    
	// Submit the request using the contacts service object
	contactsService.getContactFeed(query, function(result){
	    // An array of contact entries
        var entries = result.feed.entry;
        
        $(".usuarios_importados").html('');
        
        // Iterate through the array of contact entries
        $.each(entries, function(i,contactEntry){
            
            var emailAddresses = contactEntry.getEmailAddresses();
            var name = contactEntry.getTitle();
                        // Iterate through the array of emails belonging to a single contact entry
            for (var j = 0; j < emailAddresses.length; j++)
            {
                //do something
            }  
        });
        
	}, function(){alert('error while getting contacts')});
};

jQuery.logOut = function(){
    google.accounts.user.logout();
};