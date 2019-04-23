#This include the core concept of service worker. This is for just testing purpose of my own.
#we have installed a express server which serves the index.html file which registers the service worker using ./static/serviceW.js file.

#once service worker is install and page is refreshed service worker starts to intercept the browser request.

#our test express server serve a dummy resppnse at first request (since it is not available in browser cache). After that, response is stored in the cache storage by service worker and on subsequent request, it is served from the cache and no n/w call is made.

#code is self explanatory.

#One issue -> after registration, service worker dose not activate itself. browser need to refreshed, so that it is activated and start controlling the reqests.

