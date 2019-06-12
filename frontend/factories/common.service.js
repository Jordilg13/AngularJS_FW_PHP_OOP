project.factory("CommonService", ['$uibModal', function ($uibModal) {
  var service = {};
  // service.openModal = openModal;

  service.openModal = function (html, ctrl) {
    var modalInstance = $uibModal.open({
      animation: 'true',
      templateUrl: html,
      controller: ctrl,
      windowClass: 'show'
    });
  }

  service.tryToParseJSON = function(data){
    try {
      data2 = JSON.parse(data);
    } catch (error) {
      return data;
    }
    return data2;
  }

  return service;
}]);
