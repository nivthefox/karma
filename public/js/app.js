var app = angular.module('KarmaApp', ['ui.bootstrap', 'ui.bootstrap.tpls']);

app.config(function ($tooltipProvider) {
    $tooltipProvider.options({
        placement: 'right',
        appendToBody: true
    });
});

var config = {
    attendanceReward: 10
};

app.controller('KarmaCtrl', function ($scope, $modal) {
    $scope.toggleAll = false;
    $scope.characters = [
        {
            name : 'Katie',
            server : 'Cenarion-Circle',
            race : 'Human',
            class : 'Monk',
            gender : 'Female',
            log : [],
            karma : {
                current : 10,
                earned : 10,
                spent : 0
            },
            role : 'healer',
            selected : false
        },
        {
            name : 'Martin',
            server : 'Cenarion-Circle',
            race : 'Worgen',
            class : 'Druid',
            gender : 'Male',
            log : [],
            karma : {
                current : 10,
                earned : 10,
                spent : 0
            },
            role : 'melee',
            selected : false
        },
        {
            name : 'Blytsaal',
            server : 'Cenarion-Circle',
            race : 'Human',
            class : 'Death Knight',
            gender : 'Male',
            log : [],
            karma : {
                current : 10,
                earned : 10,
                spent : 0
            },
            role : 'tank',
            selected : false
        },
        {
            name : 'Xian',
            server : 'Cenarion-Circle',
            race : 'Pandaren',
            class : 'Shaman',
            gender : 'Male',
            log : [],
            karma : {
                current : 10,
                earned : 10,
                spent : 0
            },
            role : 'ranged',
            selected : false
        }
    ];

    $scope.log = function (character, message) {
        character.log.push({
            timestamp : (new Date).getTime(),
            message : message
        });
    };

    $scope.getImageName = function () {
        var args = Array.prototype.slice.call(arguments);

        for (var i in args) {
            args[i] = args[i].toLowerCase().replace(' ', '-');
        }

        return args.join('_');
    };

    $scope.awardAttendance = function () {
        $scope.characters.forEach(function (character) {
            if (character.selected) {
                character.karma.current += config.attendanceReward;
                character.karma.earned += config.attendanceReward;
                $scope.log(character, 'Received 10 Karma for attendance.');
            }
        });
    };

    $scope.showModal = function (template, character) {
        var modalInstance = $modal.open({
            templateUrl: template + '.html',
            controller: TemplateControllers[template],
            resolve : {
                character : function () {
                    return character;
                }
            }
        });
    };

    $scope.toggleAllCharacterSelections = function () {
        $scope.toggleAll = !$scope.toggleAll;
        $scope.characters.forEach(function (character) {
            character.selected = $scope.toggleAll;
        });
    };
});

var TemplateControllers = {};
TemplateControllers.karma = function ($scope, $modalInstance, character) {
    $scope.character = character;
    $scope.change = {};
    $scope.change.amount = 0;
    $scope.change.reason = "";
    $scope.change.deduction = 0;

    $scope.amountIsNegative = function () {
        return $scope.change.amount < 0;
    };

    $scope.ok = function () {
        amount = parseInt($scope.change.amount);

        if (amount) {
            character.karma.current += amount;

            if ($scope.change.amount > 0) {
                character.karma.earned += amount;
            }

            if (!$scope.change.deduction && amount < 0) {
                character.karma.spent += amount;
            }
        }
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};