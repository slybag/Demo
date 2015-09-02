'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', function ($scope, ApiService) {
    var products;
    $scope.categories;

    $scope.getData = function() {
      $scope.categories = [];

      ApiService.doHttpRequest("GET", "http://private-e403-slybag.apiary-mock.com/data", null)
        .then(function(data) {
          products = data;

          /**
           * vytvoreni dataSource pro select box (kategorie)
           */
          $.each(data, function(index, product) {
            if (($.inArray(product.category, $scope.categories) == -1)) {
              $scope.categories.push(product.category);
            }
          });

          $scope.initGrid();
        });
    };

    /**
     * Inicializace gridu, select boxu pro filtr dle kategorii
     */
    $scope.initGrid = function() {
      $("#grid").kendoGrid({
        dataSource: products,
        dataBound: function() {
          $scope.highlightRowsInGrid();
        },
        sortable: true,
        toolbar: [
          { template: kendo.template($("#template").html())}
        ],
        columns: [
          {
            field :"id",
            title : "id",
            width: 60,
            filterable: {
              cell: {
                operator: "contains"
              }
            }
          },
          {
            field :"name",
            title : "Jmeno",
            width: 250,
            filterable: {
              cell: {
                operator: "eq"
              }
            }
          },
          {
            field :"price",
            title : "Cena",
            width: 250,
            filterable: {
              cell: {
                operator: "eq"
              }
            }
          },
          {
            field :"category",
            title : "Kategorie",
            width: 250,
            filterable: {
              cell: {
                operator: "eq"
              }
            }
          }
        ]
      });

      $("#grid").find("#category").kendoDropDownList({
        autoBind: true,
        optionLabel: "Vsechny kategorie",
        dataSource: {
         data: $scope.categories
        },
        change: function () {
          if (this.value()) {
            $("#grid").data("kendoGrid").dataSource.filter({field: "category", operator: "eq", value: this.value()});
          } else {
            $("#grid").data("kendoGrid").dataSource.filter({});
          }

          $scope.highlightRowsInGrid();
          return this.value();
        }
      });

      $scope.highlightRowsInGrid();
    };

    $scope.highlightRowsInGrid = function() {
      $.each($("#grid").data("kendoGrid").dataSource.view(), function(index, row) {
        if (row.price >= 10) {
          $('tr[data-uid="' + row.uid + '"] ').addClass("highlighted-row");
        }
      });
    };

  });
