'use strict';

var portfolioImagesData = [
    { name: 'Image #1', src: 'app/img/1.jpg', category: 'photography'},
    { name: 'Image #2', src: 'app/img/8.jpg', category: 'graphic design'},
    { name: 'Image #3', src: 'app/img/4.jpg', category: 'web'},
    { name: 'Image #4', src: 'app/img/7.jpg', category: 'graphic design'},
    { name: 'Image #5', src: 'app/img/5.jpg', category: 'web'},
    { name: 'Image #6', src: 'app/img/2.jpg', category: 'photography' },
    { name: 'Image #7', src: 'app/img/3.jpg', category: 'photography' },
    { name: 'Image #8', src: 'app/img/9.jpg', category: 'graphic design' },
    { name: 'Image #9', src: 'app/img/6.jpg', category: 'web' },
    { name: 'Image #10', src: 'app/img/10.jpg', category: 'graphic design' },
    { name: 'Image #11', src: 'app/img/11.jpg', category: 'graphic design' },
    { name: 'Image #12', src: 'app/img/12.jpg', category: 'graphic design' }
];

var portfolioAchievementsData = [
    { text: 'Completed projects', iconSrc: 'app/img/portfolio_icon1.png', value: 3054},
    { text: 'Click pressed', iconSrc: 'app/img/portfolio_icon2.png', value: 7234873},
    { text: 'Mails sent & received', iconSrc: 'app/img/portfolio_icon3.png', value: 4670},
    { text: 'Jokes tolds', iconSrc: 'app/img/portfolio_icon4.png', value: 939}
];

var teamMembersData = [
    { name: 'John Doe', position: 'Graphic Designer', imageSrc: 'app/img/team_member1_1.jpg', description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum partioque mnesarchum eu', socialLinks: {facebook: 'https://facebook.com', twitter: 'https://twitter.com', google: 'https://google.com', dribble: 'https://dribbble.com/'} },
    { name: 'John Doe', position: 'Graphic Designer', imageSrc: 'app/img/team_member1_1.jpg', description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum partioque mnesarchum eu', socialLinks: {facebook: 'https://facebook.com', twitter: 'https://twitter.com', google: 'https://google.com', dribble: 'https://dribbble.com/'} },
    { name: 'John Doe', position: 'Graphic Designer', imageSrc: 'app/img/team_member1_1.jpg', description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum partioque mnesarchum eu', socialLinks: {facebook: 'https://facebook.com', twitter: 'https://twitter.com', google: 'https://google.com', dribble: 'https://dribbble.com/'} },
    { name: 'John Doe', position: 'Graphic Designer', imageSrc: 'app/img/team_member1_1.jpg', description: 'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum partioque mnesarchum eu', socialLinks: {facebook: 'https://facebook.com', twitter: 'https://twitter.com', google: 'https://google.com', dribble: 'https://dribbble.com/'} },
];

var app = angular.module('KETlandingApp', ['smoothScroll', 'ngCookies', 'ngRoute', 'countTo']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            reloadOnSearch: false,
            templateUrl: 'app/views/main.html',
            controller: 'mainCtrl',

        })
        .when('/:id', {
            reloadOnSearch: false,
            templateUrl: 'app/views/article.html',
            controller: 'newsSectionCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.config(function ($anchorScrollProvider) {
    $anchorScrollProvider.disableAutoScrolling();
});

app.directive('idScrolling', ['$location', 'smoothScroll', function ($location, smoothScroll) {
    var scrollOn = false;
    return {
        restrict: 'AE',
        scope: {},
        link: function (scope, element, attr) {
            element.on('click', function (e) {
                if ($location.path() !== '/') {
                    return;
                }
                e.preventDefault();                
                if (scrollOn == true) {
                    console.error('Scroll terminated: previous scroll not finished yet');
                    return;
                }
                var target = attr.href;
                if (angular.isUndefined(target)) {
                    console.error('Scroll terminated: need "href" attribute with destination ID');
                    return;
                }
                var targetId = target.split('/#')[1];
                scope.targetId = targetId;
                var element = document.getElementById(targetId);
                if (element === null) {
                    console.error('Scroll terminated: no element with such ID');
                    return;
                }
                var options = {
                    duration: 1500,
                    easing: 'easeInOutQuart',
                    offset: 100,
                    callbackBefore: function () {
                        scrollOn = true;
                    },
                    callbackAfter: function () {
                        scrollOn = false;
                    }
                };
                smoothScroll(element, options);
            });
        }
    }
}]);

 //Change $location.hash to block's id when it appear at screen
app.directive('anchorSection', ['$location', '$document', function ($location, $document) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attr) {
            var headerHeight = 100;
            $document.on('scroll', function() {
                if (attr.id === $location.hash()) {
                    return;
                }
                var sectionRect = element[0].getBoundingClientRect();
                if (sectionRect.top <= headerHeight && sectionRect.bottom > headerHeight) {
                    scope.$apply($location.hash(attr.id));
                }
            });
        }
    }
}]);


app.directive('onScreenCounter', ['$interval', '$document', function ($interval, $document) {
    var controller = ['$scope', function ($scope) {      
        $scope.startCounter = function () {           
            $scope.countTo = $scope.item.value;           
        }
    }];
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attr) {            
            $document.on('scroll', isElementOnScreen);
            var headerHeight = 100;
            function isElementOnScreen() {
                var sectionRect = element[0].getBoundingClientRect();
                if (sectionRect.top <= 300 && sectionRect.bottom > headerHeight) {
                    $document.off('scroll', isElementOnScreen);
                    scope.startCounter();                
                }
            }
           
        },
        controller: controller
    }
}]);

app.directive('teamMember', function () {
    return {
        restrict: 'AE',
        scope: {
            //two-way data binding
            personData: '='
        },
        link: function (scope, element, attr) {
            var socialLinks = angular.element(element[0].querySelectorAll('li.team-member-social-icon'));
            socialLinks.on('mouseover', function() {
                socialLinks.addClass('active');
            });
            socialLinks.on('mouseout', function() {
                socialLinks.removeClass('active');
            });
        }
    }
});

app.controller('mainCtrl', ['$scope', '$location', 'smoothScroll', function($scope, $location, smoothScroll) {
    if (angular.isDefined($location.hash())) {
        var element = document.getElementById($location.hash());
        var options = {
            duration: 800,
            offset: 100
        };
        smoothScroll(element, options);
    }
}]);

app.controller('servicesSwitchCtrl', ['$scope', function($scope) {
    $scope.serviceCurr = 0;
    $scope.serviceSelect = function (num) {
        $scope.serviceCurr = num;
    };
    $scope.isActiveService = function (num) {
        return (num === $scope.serviceCurr);
    }
}]);


app.controller('portfolioCtrl', ['$scope', function($scope) {
    $scope.achievementsData = portfolioAchievementsData;
    $scope.imagesData = portfolioImagesData;
    $scope.categoryCurr = 'all';
    $scope.test = ['all', 'web', 'photography', 'graphic design'];
    $scope.galleryCategorySelect = function (category) {
        $scope.categoryCurr = category;
    };
    $scope.isActiveCategory = function (category) {
        return (category === $scope.categoryCurr);
    };
    $scope.filterByCategory = function (item) {
        if (item.category === $scope.categoryCurr || $scope.categoryCurr === 'all') {
            return item;
        }
    }
}]);

app.controller('aboutTeamCtrl', ['$scope', function($scope) {
    $scope.teamMembersData = teamMembersData;
}]);

app.controller('newsSectionCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {    
    $http.get('app/data/data.json')
        .success(function (response) {
            $scope.newsData = response;
        })
        .error(function (response) {
            console.error(response.status);
            console.error(response.statusText);
        });
    $scope.getArticleDate = function (dateStr) {
        var articleDate = new Date(dateStr);
        return articleDate.getDate();
    };
    $scope.getArticleMonthStr = function (dateStr) {
        var articleDate = new Date(dateStr);
        var monthStr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return monthStr[articleDate.getMonth()];
    };
    $scope.articleId = $routeParams.id;
}]);

app.controller('contactFormCtrl', ['$scope', '$cookies', function($scope, $cookies) {
    // english letters and spaces (additionally added)
    $scope.nameRegex = /^[a-zA-Z\s]*$/;
    // english letters, digits, symbols '@', '_' and '.' (additionally added)
    $scope.mailRegex = /^[a-zA-Z0-9@_\.]*$/;
    // at least 20 symbols
    $scope.textRegex = /^.{20,}$/;

    $scope.showError = function (error, field) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return 'No text entered!'
            }
            else if (error.pattern) {
                switch (field) {
                    case 'name':
                        return 'Invalid characters at name field';
                    case 'mail':
                        return 'Invalid characters at mail field';
                    case 'text':
                        return 'Too short message (at least 20 characters)';
                }
            }
        }
    };
    $scope.submitHandler = function () {
        // Cookies expires date set to next month
        var now = new Date(),
            exp = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        $cookies.put('contactMessageName', $scope.messageName, { expires: exp });
        $cookies.put('contactMessageMail', $scope.messageMail, { expires: exp });
        alert("Success, sending data!\nData saved to cookies, reload page and check form!")
        // Remove entered message text after submit and make form pristine
        $scope.messageText = '';
        $scope.contactForm.$setPristine();
    };
    $scope.getMessageFromCookies = function () {
        $scope.messageName = $cookies.get('contactMessageName') || '';
        $scope.messageMail = $cookies.get('contactMessageMail') || '';
    }
}]);





