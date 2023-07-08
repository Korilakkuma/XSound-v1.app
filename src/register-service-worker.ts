if (process.env.NODE_ENV === 'production' && navigator.serviceWorker) {
  navigator.serviceWorker
    .register('./sw.js', { scope: '/' })
    .then((registration: ServiceWorkerRegistration) => {
      // eslint-disable-next-line no-console
      console.log(registration.installing);
    })
    .catch((error: Error) => {
      // eslint-disable-next-line no-console
      console.error(error.message);
    });
}
