import App from "./App.svelte";

const app = new App({
	target: document.body
});

let offline = false;

// register the service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("./serviceWorker.js")
		.then(function(reg) {
			console.log("Successfully registered service worker", reg);
		})
		.catch(function(err) {
			console.warn("Error whilst registering service worker", err);
		});
}

window.addEventListener('beforeinstallprompt', function(e) {
    e.userChoice.then(function(choiceResult){
        console.log(choiceResult.outcome);
        if(choiceResult.outcome == 'dismissed'){
            console.log('User cancelled home screen install');
        }else{
            console.log('User added to home screen');
        }
    });
});

// check if the user is connected
if (navigator.onLine) {
	console.log("Loading data");
} else {
	// show offline message
	console.log("Offline");
}

export default app;
