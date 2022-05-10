import swUtil from '/service-worker-util.js';

if(swUtil.checkIfBrowserSupportsServiceWorkers()) {
	swUtil.serviceWorkerRegister('./service-worker.js');  
}