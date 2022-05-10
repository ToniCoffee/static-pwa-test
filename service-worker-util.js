function checkIfBrowserSupportsServiceWorkers() {
	if('serviceWorker' in navigator) return true;
	else {
		console.warn('Browser NOT supports service workers');
		return false;
	}
}

function serviceWorkerRegister(pathToServiceWorker) {
	if(pathToServiceWorker === '' || pathToServiceWorker === null || pathToServiceWorker === undefined) {
		throw new Error('pathToServiceWorker is null, undefined or empty');
	} else {
		navigator.serviceWorker.register(pathToServiceWorker)
			.then(reg => console.log(`*** SERVICE WORKER SUCCESFULLY REGISTER. ***`))
			.catch(err => console.error(`*** ERROR WHEN TRYING REGISTER SERVICE WORKER ***\n ${{error: err}}`));
	}
}

export default {
	checkIfBrowserSupportsServiceWorkers,
	serviceWorkerRegister
};