var app = angular.module('myApp', ['ngRoute']);

const {
    remote
} = require('electron');


app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .when('/addtask', {
            templateUrl: 'pages/addtask.html',
            controller: 'addTaskCtrl'
        })
        .when('/totaltask', {
            templateUrl: 'pages/totaltask.html',
            controller: 'totalTaskCtrl'
        })
        .when('/notifications', {
            templateUrl: 'pages/notifications.html',
            controller: 'notificationsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
})

// Dashboard Controller
app.controller('dashboardCtrl', function ($scope, $location) {

    // AlertButton
    // $scope.closeBtn = function () {
    //     document.querySelector('#closeBtn').addEventListener('click', () => {
    //         alert('deneme')
    //     })
    // }

    $scope.home = function () {
        $location.path('/dashboard')
    }
    $scope.addtask = function () {
        $location.path('/addtask')
    }
    $scope.totaltask = function () {
        $location.path('/totaltask')
    }
    $scope.notifications = function () {
        $location.path('/notifications')
    }
    $scope.exit = function () {

        let w = remote.getCurrentWindow()
        w.close()
    }
});


// Add Task Controller
app.controller('addTaskCtrl', function ($scope, $location) {

    // $scope.days = myService.days;

    $scope.showval = true;
    $scope.hideval = true;
    $scope.hideval2 = true;
    $scope.isShowHide = function (param) {
        if (param == "first") {
            $scope.showval = true;
            $scope.hideval = true;
            $scope.hideval2 = true;
        } else if (param == "middle") {
            $scope.showval = false;
            $scope.hideval = false;
            $scope.hideval2 = true;
        } else if (param == "last") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = false;
        }
    }

    $scope.home = function () {
        $location.path('/dashboard')
    }
    $scope.addtask = function () {
        $location.path('/addtask')
    }
    $scope.totaltask = function () {
        $location.path('/totaltask')
    }
    $scope.notifications = function () {
        $location.path('/notifications')
    }
    $scope.exit = function () {

        let w = remote.getCurrentWindow()
        w.close()
    }

    //Save Button
    $scope.add = function () {

        db.collection('tasks').add({
            ad: $scope.ad,
            soyad: $scope.soyad,
            task: $scope.task
        }).then(() => {
            console.log('ekleme basarili');
            alert('Görev Ekleme Başarılı');
        }).catch(err => {
            console.log(err.message);
        })
    }
});

// Total Tasks Controller
app.controller('totalTaskCtrl', function ($scope, $location) {

    //Main Routing Part
    $scope.home = function () {
        $location.path('/dashboard')
    }
    $scope.addtask = function () {
        $location.path('/addtask')
    }
    $scope.totaltask = function () {
        $location.path('/totaltask')
    }
    $scope.notifications = function () {
        $location.path('/notifications')
    }
    $scope.exit = function () {

        let w = remote.getCurrentWindow()
        w.close()
    }

    //Task Listing to HTML
    const taskList = document.querySelector('#task-list');

    // create element and render tasks
    const renderTasks = doc => {
        const li = taskTemplate(doc);
        taskList.insertAdjacentHTML("beforeend", li);
    }
    const taskTemplate = doc => `
    <div class="accordion" id="qua">
        ${doc.data().ad} ${doc.data().soyad}
        <div id="${doc.id}" class="panel">
            <p>${doc.data().task}</p><br>
        </div>
    </div>
    `

    db.collection('tasks').get().then((snapshot) => {
        //console.log(snapshot.docs);
        snapshot.docs.forEach(doc => {
            renderTasks(doc);
        }) //Toggle Func
        const objects = document.querySelectorAll('.accordion');
        for (var object of objects) {
            object.addEventListener('click', function (e) {
                const childId = e.path[0].children[0].id;
                const element = document.getElementById(childId);
                let state = element.style.display;
                if (state == 'block') {
                    element.style.display = 'none';
                } else {
                    element.style.display = 'block';
                }
            })
        }
    })

    //Func deneme
    $scope.size = db.collection("tasks").get().then(function (snap) {
        size = snap.size;
        console.log('function deneme:', size);
    });

    //Settimeout Deneme
    $scope.numGen = this
    var numGen = setTimeout(function () {
        childNum = document.querySelector('#task-list').children;
        numGen = childNum.length;
        console.log(childNum);
        console.log('settimeout deneme:', numGen);
    }, 1000);
});



// Notifications Controller
app.controller('notificationsCtrl', function ($scope, $location) {

    $scope.home = function () {
        $location.path('/dashboard')
    }
    $scope.addtask = function () {
        $location.path('/addtask')
    }
    $scope.totaltask = function () {
        $location.path('/totaltask')
    }
    $scope.notifications = function () {
        $location.path('/notifications')
    }
    $scope.exit = function () {

        let w = remote.getCurrentWindow()
        w.close()
    }
});