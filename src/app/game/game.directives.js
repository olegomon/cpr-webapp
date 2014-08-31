angular.module('cpr.game.directives', [
])

    .directive('gesturePicker', function () {
        return {
            restrict: 'E',
            scope   : {
                gesture: '=',
                state  : '='
            },

            templateUrl: 'game/gesture-picker.tpl.html',

            controller: function ($scope, $interval) {

                $scope.mask = "";

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                }

                $scope.$watch('state', function (state) {
                    if (state === 'reveal') {
                        reveal();
                    }
                    if (state === 'play') {
                        mask();
                        play();
                    }
                });

                var interval;

                function mask() {
                    interval = $interval(function () {
                        $scope.mask = getRandomInt(0, 5);
                    }, 100);
                }

                function reveal() {
                    $interval.cancel(interval);
                    $scope.mask = $scope.gesture;
                }

                function play() {
                    var timeout = getRandomInt(2000, 4000);
                    $interval(function () {
                        $scope.gesture = getRandomInt(0, 5);
                    }, timeout, 1);
                }
            }
        };
    })
;
