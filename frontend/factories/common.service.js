project.factory("CommonService", ['$uibModal', function ($uibModal) {
  var service = {};
/**
 * opens a modal with the specified template and it's controller
 *
 * @param string html
 * @param string ctrl
 */
service.openModal = function (html, ctrl) {
    var modalInstance = $uibModal.open({
      animation: 'true',
      templateUrl: html,
      controller: ctrl,
      windowClass: 'show'
    });
  }
/**
 * try to parse a JSON string into an object, if it fails return the original data
 *
 * @param string data
 * @returns Object
 */
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
