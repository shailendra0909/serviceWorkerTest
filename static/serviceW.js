if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/test.js").then(() => {
            //console.log(arguments);
            console.log("service worker registerd");
        }).catch((error) => {
            console.log("problem in service worker registration", error);
        })
    }, () => {
        console.log("load error ");
    })
}