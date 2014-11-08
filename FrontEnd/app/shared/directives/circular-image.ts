angular.module('app.shared').directive('circularImage', [() => {
    
    return {
        link : (scope, element, attrs) => {
            
        },
        templateUrl: 'app/shared/views/circular-image.html',
        replace : true
    }
}]) 