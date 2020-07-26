if ((process.env.NODE_ENV === 'production') && navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js', { scope: '/' })
    .then((registration: ServiceWorkerRegistration) => {
      console.log(registration.installing);
    })
    .catch((error: Error) => {
      console.error(error.message);
    });
}
