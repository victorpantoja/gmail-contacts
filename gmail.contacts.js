/**
 *  @author Victor Pantoja
 */
(function($) {
    $.extend($, {
        gmail:{
            init:function() {
            	var self = this;
            	
            	// Create the contacts service object
            	var contactsService = new google.gdata.contacts.ContactsService('your-application');
            	
                $("#gmail-contacts").click(function() {
                        self.logIn();
                        // The feed URI that is used for retrieving contacts
                    	var feedUri = 'http://www.google.com/m8/feeds/contacts/default/full';
                    	var query = new google.gdata.contacts.ContactQuery(feedUri);

                    	// Set the maximum of the result set to be 50
                    	query.setMaxResults(50);

                    	// Submit the request using the contacts service object
                    	contactsService.getContactFeed(query, self.callback, self.handleError);
                        return false;
                    }
                );
            },
            
            // callback method to be invoked when getContactFeed() returns data
            callback:function(result)
            {
                // An array of contact entries
                var entries = result.feed.entry;

                // Iterate through the array of contact entries
                $.each(entries, function(i,contactEntry){
                    var emailAddresses = contactEntry.getEmailAddresses();
                    
                    // Iterate through the array of emails belonging to a single contact entry
                    for (var j = 0; j < emailAddresses.length; j++)
                    {
                        var emailAddress = emailAddresses[j].getAddress();
                        console.debug('email = ' + emailAddress);
                    }  
                });
            },
            
            handleError:function(error){
                alert(error);
            },
            
            logIn:function(){
                var scope = 'http://www.google.com/m8/feeds';
                var token = google.accounts.user.login(scope);
            },
            
            logOut:function(){
              google.accounts.user.logout();
            }
        }
    });

    $.fn.gmail = function() {
        $.gmail.init();
    };
})(jQuery);
