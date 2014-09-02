angular.module('cpr.game.directives', [
])

    .directive('circleLayout', function () {
        return {
            restrict   : 'E',
            transclude : true,
            scope      : {
                centerIcon: '='
            },
            templateUrl: 'game/circle-layout.tpl.html'
        };
    })

    .directive('score', function () {
        return {
            restrict   : 'E',
            replace    : true,
            scope      : {
                'winner' : '=',
                'player1': '=',
                'player2': '=',
                'score'  : '='
            },
            templateUrl: 'game/score.tpl.html'
        };
    })

    .directive('gesture', function () {
        return {
            restrict   : 'E',
            replace    : true,
            transclude : true,
            scope      : {
                count    : '=',
                gesture  : '=',
                highlight: '='
            },
            templateUrl: 'game/gesture.tpl.html'
        };
    })

    .directive('gesturePicker', function () {
        return {
            restrict: 'E',
            scope   : {
                player: '=',
                state: '='
            },
            replace: true,
            templateUrl: 'game/gesture-picker.tpl.html',
            controller: function ($scope, PlayerType) {
                $scope.isComputer = function(player) {
                    return player.type === PlayerType.COMPUTER;
                };

                $scope.isHuman = function(player) {
                    return player.type === PlayerType.HUMAN;
                };
            }
        };
    })

    .directive('userGesturePicker', function () {
        return {
            restrict: 'E',
            scope   : {
                gesture: '=',
                state  : '='
            },

            templateUrl: 'game/user-gesture-picker.tpl.html',

            controller: function ($scope, RulesService) {
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
                        randomHighlight();
                        pick();
                    }
                });

                var interval;

                function randomHighlight() {
                    interval = $interval(function () {
                        var mask = getRandomInt(min, max);
                        // to prevent same random numbers in a row does not look nice on the ui
                        if (mask === $scope.mask) {
                            if (mask === max - 1) {
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

                function pick() {
                    var timeout = getRandomInt(3000, 3000);
                    $interval(function () {
                        $scope.gesture = getRandomInt(min, max);
                    }, timeout, 1);
                }
            }
        };
    })
;
