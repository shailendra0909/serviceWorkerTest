//this will handle install event of itself

const CACHE_NAME = "sp.test.cache";
const FILES_TO_ADD = [
    '/'
];
const WHITE_FILE_LIST = [
];

//this will be called on the install step in service workers
self.addEventListener('install', (event) => {
    console.log('install stage');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_ADD);
        })
    );
})

//this will be called on the activation step in service workers
self.addEventListener('activate', (event) => {
    //clear your old cache
    console.log('activation stage');
    event.waitUntil(
        caches.keys().then((files) => {
            return Promise.all(
                files.map((file) => {
                    if (WHITE_FILE_LIST.indexOf(file) === -1) {
                        return cache.delete(file);
                    }
                })
            );
        })
    );
});

//intecept the browser n/w request and use the cache
self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        //check in the cache
        caches.match(fetchEvent.request).then((response) => {
            if (response) {
                console.log('found in the cache');
                return response;
            }
            //else make a network call. since a request can be consumed only once, 
            //we need to create another request to make actual server call.
            let newRequest = fetchEvent.request.clone();
            console.log('making a n/w call');
            return fetch(newRequest).then((response) => {
                //if not a valid response, dont cache it
                if (!response || response.status != 200) {
                    return response;
                } else {
                    //cache it for next request, need to duplicate the response as well
                    // since it can be consumed only once.
                    var responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(fetchEvent.request, responseToCache);
                    });
                    return response;
                }
            });
        }))
})