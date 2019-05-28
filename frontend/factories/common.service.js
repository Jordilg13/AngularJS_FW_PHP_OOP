project.factory("CommonService", ['$uibModal',function ($uibModal) {
  var service = {};
  service.openModal = openModal;
  return service;

  function openModal(html,ctrl) {
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: html,
        controller: ctrl,
        windowClass : 'show'
    });
  }
}]);
