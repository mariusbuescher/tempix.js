(function( window, document, $ ) {
  'use strict';

  window.Tempix = function () {

    this.templatePrefix = 'tempix-';
    this.expiration = 10;
    this.templates = new Object();

    return this;
  };

  window.Tempix.prototype.downloadTemplate = function (template) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', template.url, false);
    xhr.send();
    var response = xhr.responseText;
    template.source = response;
    this.saveTemplate(template);
  };

  window.Tempix.prototype.saveTemplate = function (template) {
    template.tstamp = parseInt(Date.now() / 1000);
    localStorage.setItem(this.templatePrefix + template.name, JSON.stringify(template));
  };

  window.Tempix.prototype.get = function () {
    var result;

    if (arguments.length > 1) {
      result = new Object();

      for (var i = 0; i < arguments.length; i++) {
        result[arguments[i]] = this.fetchTemplate(arguments[i]);

        if (result[arguments[i]] === false || (result[arguments[i]].tstamp + this.expiration) < parseInt(Date.now() / 1000) || window.applicationCache.status === window.applicationCache.UPDATEREADY) {
          this.downloadTemplate(this.templates[arguments[i]]);
          result[arguments[i]] = this.fetchTemplate(arguments[i]);
        }
      }

    } else {
      result = this.fetchTemplate(arguments[0]);

      if (result === false || (result.tstamp + this.expiration) < parseInt(Date.now() / 1000) || window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        this.downloadTemplate(this.templates[arguments[0]]);
        result = this.fetchTemplate(arguments[0]);
      }
    }

    return result;

  };

  window.Tempix.prototype.fetchTemplate = function (templateName) {
    var item = localStorage.getItem(this.templatePrefix+templateName);
    var template = JSON.parse( item || 'false' );

    return template;
  };

})( this, document, jQuery );
