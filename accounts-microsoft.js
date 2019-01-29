'use strict';

/**
 * Register this service (boilerplate).
 */
Accounts.oauth.registerService('microsoft');

/**
 * Client functionality (boilerplate).
 */
if (Meteor.isClient) {
  Meteor.loginWithMicrosoft = function(options, callback) {

    /**
     * support (options, callback) and (callback)
     */
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    /**
     *
     */
    console.log("loginWithMicrosoft");

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    var callbackModifier = function(callback) {
      return function (credentialTokenOrError) {
        if(credentialTokenOrError && credentialTokenOrError instanceof Error) {
          callback && callback(credentialTokenOrError);
        } else {
          console.log("credentialTokenOrError", credentialTokenOrError)
          Accounts.oauth.tryLoginAfterPopupClosed(credentialTokenOrError, callback);
        }
      };
    };

    var credentialRequestCompleteCallback = callbackModifier(callback);
    Microsoft.requestCredential(options, credentialRequestCompleteCallback);
  };

/**
 * Server functionality (boilerplate).
 * Ensures sanity of published user object.
 */
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: _.map(
      /**
       * Logged in user gets whitelisted fields + accessToken + expiresAt.
       */
      Microsoft.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
      function(subfield) {
        return 'services.microsoft.' + subfield;
      }),

    forOtherUsers: _.map(
      /**
       * Other users get whitelisted fields without emails, because even with
       * autopublish, no legitimate web app should be publishing all users' emails.
       */
      _.without(Microsoft.whitelistedFields, 'email', 'verified_email'),
      function(subfield) {
        return 'services.microsoft.' + subfield;
      })
  });
}
