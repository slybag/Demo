'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', function ($scope) {
    var products = [
      {
        "id":11,
        "name":"jablko",
        "category":"ovoce",
        "price":5
      },
      {
        "id":22,
        "name":"hruška",
        "category":"ovoce",
        "price":7
      },
      {
        "id":33,
        "name":"mléko",
        "category":"nápoje",
        "price":16
      },
      {
        "id":44,
        "name":"pivo",
        "category":"nápoje",
        "price":15
      },
      {
        "id":55,
        "name":"pomeranč",
        "category":"ovoce",
        "price":9
      },
      {
        "id":66,
        "name":"ananas",
        "category":"ovoce",
        "price":50
      },
      {
        "id":77,
        "name":"víno",
        "category":"nápoje",
        "price":110
      },
      {
        "id":88,
        "name":"švestka",
        "category":"ovoce",
        "price":3
      }
    ];
    $scope.categories;

    /**
     * Zde by byl dotaz na server. Vyuzil bych $http, metodu GET. kdyz mam takto file na disku, nemam primo z kodu k nemu pristup, kvuli prohlizeci
     * (jedine jej nahrat rucne v prohlizeci pres $file a $upload - nebylo soucasti zadani)
     *Proto je obsah nahrany primo tady v kodu.
     *Tzn tato metoda je docela useless, ale pro ukazku, v teto metode bych ziskal data, ktera si ulozim do promenne, a dale na server nepristupji,
     * dale z techto dat vytvorim pole kategorii pro select box.
     *
     */
    $scope.getData = function() {
      $scope.categories = [];

      $.each(products, function(index, product) {
        if (($.inArray(product.category, $scope.categories) == -1)) {
          $scope.categories.push(product.category);
        }
      });

      $scope.initGrid()
    };

    /**
     * Inicializace gridu, select boxu pro filtr dle kategorii, opet kategorie nahrane rucne
     */
    $scope.initGrid = function() {
      $("#grid").kendoGrid({
        dataSource: {
          requestEnd: function(e) {
            $scope.highlightRowsInGrid();
          },
          data: products
        },
        editable:{
          confirmation:false //remove delete confirm message
        },
        scrollable:true,
        resizable: true,

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
          data : $scope.categories
        },
        change: function () {
          var value = this.value();
          if (value) {
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
