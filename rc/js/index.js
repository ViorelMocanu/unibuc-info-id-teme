var angularChat = angular.module('angularChat', []);

angularChat.controller('angularChatController', ['$scope', function($scope){
  
  $scope.enterChat = function($event) {
    $event.preventDefault();
    if( $scope.username ) {
      $scope.loggedIn = true;
    }
  }
  
  $scope.username;
  
  $scope.loggedIn;
  
  $scope.chat = [
    {id: '', user: ''}  
  ];
  
  $scope.users = [
    {username: 'John Doe', status: 'online', id: '1', avatar: 'https://freeiconshop.com/files/edd/person-flat.png'},
    {username: 'Rick Doe', status: 'offline', id: '2', avatar: 'https://freeiconshop.com/files/edd/person-flat.png'},
    {username: 'Barny Doe', status: 'idle', id: '3', avatar: 'https://freeiconshop.com/files/edd/person-flat.png'}
  ];
  
  $scope.messages = {
    '1': [
      {username: 'Barny Doe', message: 'This', id: '1'},
      {username: 'Barny Doe', message: 'Chat', id: '1'},
      {username: 'Barny Doe', message: 'Made', id: '1'},
      {username: 'Barny Doe', message: 'In', id: '1'},
      {username: 'Barny Doe', message: 'Angular', id: '1'},
      {username: 'Barny Doe', message: 'Is', id: '1'},
      {username: 'Barny Doe', message: 'Awesome', id: '1'}    
    ],
    '2': [
      {username: 'Barny Doe', message: 'This', id: '1'},
    ],
    '3': [
      {username: 'Barny Doe', message: 'Hi, im Barny Doe', id: '1'},
    ]
  }
  
  $scope.changeRoom = function(id, username) {
    $scope.chat = {id: id, user: username};
  }
  
  $scope.sendMessage = function() {
    if( $scope.message ) {
      $scope.messages[$scope.chat.id].push({ username: $scope.username, message: $scope.message, id: $scope.chat.id });
      $scope.message = '';
    }
  }

}]);