Package.describe({
  name: 'uibalabs:accounts-microsoft',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Login service for Microsoft (and AzureAD), using the OAuth 2.0 protocol.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/uiba/uiba-accounts-microsoft.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');

  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth', ['client', 'server']);
  api.use('uibalabs:microsoft@1.0.0', ['client', 'server']);

  api.addFiles('accounts-microsoft_login_button.css', 'client');

  api.addFiles('accounts-microsoft.js');
  api.mainModule('accounts-microsoft.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('uibalabs:accounts-microsoft@1.0.0');
  api.mainModule('accounts-microsoft-tests.js');
});
