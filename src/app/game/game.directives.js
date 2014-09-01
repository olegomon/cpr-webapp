angular.module('cpr.game.directives', [
])

    .directive('gesturePicker', function () {
        return {
            restrict: 'E',
            scope: {
                gesture: '=',
                state  : '='
            },

            templateUrl: 'game/gesture-picker.tpl.html',

            controller: function ($scope, RulesService) {
                $scope.center = 'user';
                $scope.pick = function (gesture) {
                    $scope.gesture = gesture;
                };
                $scope.gestures = RulesService.getGestures();
            }
        };
    })

    .directive('autoGesturePicker', function () {
        return {
            restrict: 'E',

            scope: {
                gesture: '=',
                state  : '='
            },

            templateUrl: 'game/auto-gesture-picker.tpl.html',

            controller: function ($scope, $interval, RulesService) {

                $scope.gestures = RulesService.getGestures();

                var min = 0;
                var max = $scope.gestures.length;

                $scope.center = 'laptop';

                $scope.mask = "";

                // Returns a random integer between min (included) and max (excluded)
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
                        var mask = getRandomInt(min, max);
                        // to prevent same random numbers in a row does not look nice on the ui
                        if(mask === $scope.mask) {
                            if(mask === max - 1) {
                                mask -= 1;
                            } else {
                                mask += 1;
                            }
                        }
                        $scope.mask = mask;
                    }, 200);
                }

                function reveal() {
                    $interval.cancel(interval);
                    $scope.mask = $scope.gesture;
                }

                function play() {
                    var timeout = getRandomInt(3000, 3000);
                    $interval(function () {
                        $scope.gesture = getRandomInt(min, max);
                    }, timeout, 1);
                }
            }
        };
    })
;
