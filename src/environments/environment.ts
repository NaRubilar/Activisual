// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBPIAdk1Ncnm96OzJx0Ulkwxuy38R2o7YE",
    authDomain: "activisual-9de00.firebaseapp.com",
    projectId: "activisual-9de00",
    storageBucket: "activisual-9de00.appspot.com",
    messagingSenderId: "944372527588",
    appId: "1:944372527588:web:639480ef9034e9fc5357f1"
  },
  useEmulators: true, // Cambia a false en producción
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
