#Homework 

###Задача 1
Создайте приложение-калькулятор. В приложении должно быть два поля ввода и кнопки «+», «-», «*», «/». Реализуйте двунаправленную привязку таким образом, чтобы при нажатии на кнопки результат арифметических операций выводился на странице. 

###Задача 2 
Дано массив items: 
```
     $scope.items = [
             { name: "B Item", price: 10.9, category: "Category 1", count: 10, tax: 1.12, expiration: 10 },
             { name: "A Item", price: 1.1, category: "Category 1", count: 8, tax: 0.55, expiration: 12 },
             { name: "D Item", price: 2.6, category: "Category 2", count: 7, tax: 0.22, expiration: 5 },
             { name: "C Item", price: 17.5, category: "Category 2", count: 33, tax: 2.77, expiration: 10 }];
``` 
Создайте страницу с элементом select. Реализуйте следующее: 
В зависимости от выбранного варианта в списке select, на экране отображаются данные массива или в виде таблицы, или в виде списка 

###Задача 3
Реализуйте SPA приложение, в котором пользователю представляется пройти тест из 5 вопросов, в каждом вопросе по 4 варианта ответа. Вопросы должны выбираться с помощью radio-button и когда выбран, например, вопрос №1, то на странице должны появится варианты ответа только для этого вопроса. В конце тестирования отобразите результат теста. При решении данной задачи используйте директиву ng-switch.
<!DOCTYPE HTML>
<html lang="en" ng-app="task2">
<head>
	<meta charset="utf-8" />
    <title></title>

    <script src="../Libraries/angular.js"></script>
    <link href="../Libraries/bootstrap.css" rel="stylesheet" />
    <link href="../Libraries/bootstrap-theme.css" rel="stylesheet" />
    <script>
    	var task2 = angular.module("task2", []);
    	task2.controller("ItemsCtrl", function($scope){
    		$scope.items = [
             { name: "B Item", price: 10.9, category: "Category 1", count: 10, tax: 1.12, expiration: 10 },
             { name: "A Item", price: 1.1, category: "Category 1", count: 8, tax: 0.55, expiration: 12 },
             { name: "D Item", price: 2.6, category: "Category 2", count: 7, tax: 0.22, expiration: 5 },
             { name: "C Item", price: 17.5, category: "Category 2", count: 33, tax: 2.77, expiration: 10 }];


            $scope.chkbxs = [{label:"Name", val:true },{label:"Price", val:true },{label:"Category", val:true }, {label:"Count", val:true }, {label:"Tax", val:true }, {label:"Expiration", val:true }];    

            $scope.options = [{display: 'Table', value: 'table'}, {display: 'List', value: 'list'}];
         	$scope.mode = $scope.options[0];
    	})  
	</script>
	 <style type="text/css">
    	table, th, td{
    		text-align: center;
    	}
    </style>
</head>
<body ng-controller="ItemsCtrl">
<select class="form-control" ng-model="mode"
              ng-options="item.display for item in options track by item.value"></select>
	<div class="controller" >
		<h1>Categories of items</h1>
		<div ng-switch="mode.value">
	        <div ng-switch-when="table">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Name</th>
					        <th>Price</th>
					        <th>Category</th>
					        <th>Count</th>
					        <th>Tax</th>
					        <th>Expiration</th>		
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in items">
							<td>{{item.name}}</td>
			                <td>{{item.price}}</td>
			                <td>{{item.category}}</td>
			                <td>{{item.count}}</td>
			                <td>{{item.tax}}</td>
			                <td>{{item.expiration}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div ng-switch-when="list">
	          <ul style="margin:0; padding: 0">
	            <li ng-repeat="item in items" class="list-group-item">
	                {{item.name}} : {{item.price}}, {{item.category}}, {{item.count}}, {{item.tax}}, {{item.expiration}}
	            </li>
	          </ul>
	        </div>
        </div>
	</div>
</body>
</html>