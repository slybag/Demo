
app.service('ApiService', function ($http, $q) {

  this.doHttpRequest = function (type, url, params) {
    var deffered = $q.defer();
    $http({
      method: type,
      url: url,
      data: params,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function (data) {
      deffered.resolve(data);
    }).error(function () {
      /**
       * Zde bych osetroval chyby napr podle http kodu ze serveru (napr 401, 400..atd)
       */
      deffered.reject();
    });

    return deffered.promise;
  };

});
