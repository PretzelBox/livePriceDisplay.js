/*
 * livePriceDisplay.js by Joah Gerstenberg
 *
 * To use, simply append the following script to the end 
 * of product-page.js.
 */

var prc = parseFloat($('.PriceToUpdate').text().substr(1,$('.PriceToUpdate').text().length-1), 10);
var ignore = false;
 
function parseQtyMatrix() {
  var matrix = {};
  $('.ProductDetailsQuantityPriceTable').each(function() {
    $(this).find(' > tbody > tr:first-child').find('td:not(:first-child)').each(function() {
      var prc = $(this).parent().parent().find(' > tr:nth-child(2) td:nth-child(' + ($(this).index() + 1) + ')').text();
      matrix[$(this).text()] = parseFloat(prc.substr(1,prc.length-1), 10);
    });
  });
  return matrix;
}
 
function getQtyPrice(qty){
  var matrix = parseQtyMatrix();
  
  for (k in matrix) {
    if (k.split('-').length === 2 && parseFloat(k.split('-')[0], 10) <= qty && parseFloat(k.split('-')[1], 10) >= qty) {
      return matrix[k];
    } else if (k.split('+').length === 2 && parseFloat(k.split('+')[0], 10) <= qty) {
      return matrix[k];
    }
  }
  
  return prc;
}
 
function updateQty(val) {
  ignore = true;
  $('.PriceToUpdate').text('$' + (getQtyPrice(parseInt(val, 10)) * parseInt(val, 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')); 
  ignore = false;
}
 
$('#txtQuantity').on('keyup click change focus blur', function() { 
  if ($(this).val()) {
    updateQty($(this).val());
  }
});
 
$(document).on('DOMSubtreeModified', '.PriceToUpdate', function() {
  if (!ignore) {
    prc = parseFloat($('.PriceToUpdate').text().substr(1,$('.PriceToUpdate').text().length-1), 10);
    updateQty($('#txtQuantity').val());
  }
});