
//to toggle around the items categories
$(document).ready(function () {
    $("#category1").on("click", function () {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $("ul#category1").addClass('show');
        } else {
            $("ul#category1").removeClass('show');
        }
        $(this).data('state', state);
    });
    $("#category2").on("click", function () {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $("ul#category2").addClass('show');
        } else {
            $("ul#category2").removeClass('show');
        }
        $(this).data('state', state);
    });
    $("#category3").on("click", function () {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $("ul#category3").addClass('show');
        } else {
            $("ul#category3").removeClass('show');
        }
        $(this).data('state', state);
    });
    $("#category4").on("click", function () {
        var state = $(this).data('state');
        state = !state;
        if (state) {
            $("ul#category4").addClass('show');
        } else {
            $("ul#category4").removeClass('show');
        }
        $(this).data('state', state);
    });


    $.getJSON("https://webmppcapstone.blob.core.windows.net/data/itemsdata.json", function(data) {
        var imgList = '';
        for(var i = 0; i < 3; i++) {
        imgList += `<li><img src="${data[i].subcategories[i].items[i].imagelink}"></li>`;
         
        } 
            console.log(imgList);
            $('#image_slider').append(imgList);
    });

    //to display the items from the itemsdata.json file
    $('a#subcategory').on('click', function (event) {

        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "https://webmppcapstone.blob.core.windows.net/data/itemsdata.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        let categoryName = $(this).text(); 
        let subcategory = getSubcategory(categoryName, json); 
        if (subcategory === "not found") {  
            $('#items').html('');
            $('#subcategoryName').html(`There is no "${categoryName}" category.`);  
        }
        else {  
            attachToDOM(subcategory); 

        }
    });

    function getSubcategory(categoryName, json) {
        let foundSubcategory = 'not found';  
        json.forEach(function (category) {  
            category.subcategories.forEach(function (subcategory) { 
                if (subcategory.name === categoryName) { 
                    foundSubcategory = subcategory;
                }
            })
        })
        return foundSubcategory;  
    }

    function attachToDOM(subcategory) {
        $('#items').html(''); 
        if (!subcategory.items.length) { 
            $('#subcategoryName').html(subcategory.name); 
            $('#items').text('There are no items in stock'); 
        }
        else { 
            let output = '';
            subcategory.items.forEach(function (item) { 
                console.log(item);
                output += `
                <div class="col-md-3 items">
                    <div class='photo'>
                        <img src="${item.imagelink}">
                    </div>
                    <div class="info">
                        <h5>${item.name}</h5>
                        <h5 class="price">$${item.price}</h5>
                        <h6 class="hidden rate">${item.rating}</h6>
                    </div>
                    <div class="add">
                    <button class="btn btn-primary add">Add to cart</button>
                    </div>
                </div>
                `;
                $('#items').html(output);
            })
        }
    }


    //to show product details
    //function itemSelected(name){
    $('#items').delegate('.items', 'click', '${item.name}', function(id) {
        sessionStorage.setItem('itemName', id);
        window.location = 'product.html';
        return false;
      })

      function getItem(subcategory){
        let itemName = sessionStorage.getItem('itemName');
        subcategory.items[i].forEach(function (name) {
            console.log(name);
            let output =`
        <div class="row">
		
        </div>
      `;

      $('#item').html(output);
        })
      }


    //to add to cart
    //var itemCount = 0;

    $('button.add').click(function () {
        let output = '';
        output += `

            <div class="product-image">
                <img src="${item.imagelink}">
            </div>
            <div class="product-name">
                <div class="product-title">${item.name}</div>
            </div>
            <div class="product-price">$${item.price}</div>
            <div class="product-quantity">
                <input type="number" value="1" min="1">
            </div>
            <div class="product-line-price">45.99</div>
        `;
        $('.product').html(output);
        // itemCount++;
        // $('#itemCount').html(itemCount).css('display', 'block');
    });


    //sorting the items
    $(document).on("change", ".sorting", function() {
        var sortingMethod = $(this).val();
        var sortItems = $(".items");
        if(sortingMethod == 'alpha') {
            sortItems.sort(function(a, b) {
                if (($(b).text()) < ($(a).text())) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            $("#items").append(sortItems);
        }
        else if(sortingMethod == 'price') {
            sortItems.sort(function(a, b){
                var convertToNumber = function(value){
                    return parseFloat(value.replace('$',''));
               }
               var vA = convertToNumber($(a).find('.price').html());
               var vB = convertToNumber($(b).find('.price').html());
                if (vB < vA) { 
                    return 1;
                }
                else {
                    return -1;
                } 
            });
            $("#items").append(sortItems);
        }
        else if(sortingMethod == 'rate') {
            sortItems.sort(function(a, b){
                if (($(b).find('.rate').html()) > ($(a).find('.rate').html())) { 
                    return 1;
                }
                else {
                    return -1;
                } 
            });
            $("#items").append(sortItems);
        }
    
    });

    

    //carousel slide
    var slideValue = 1;
    displaySlides(slideValue);

    function currentSlide(n) {
    //$('.carousel-indicators').delegate('li.circle', 'click', function(n) {
        displaySlides(slideValue = n);
    //})
    }

    function arrowSlide(n) {
        displaySlides(slideValue += n);
    }

    var autoSlider;
    $('.checkbox').delegate('input#checkbox', 'click', function() {
        if (document.getElementById("checkbox").checked == true) {
            autoSlider = setInterval(function () {
                $('#slideshow > div:first')
                    .hide()
                    .next()
                    .show()
                    .end()
                    .appendTo('#slideshow');
            }, 3000);
        }
        if (document.getElementById("checkbox").checked == false) {
            clearInterval(autoSlider);
        }
    });


    function displaySlides(n) {
        var i;
        var items = document.getElementsByClassName('item');
        var circles = document.getElementsByClassName('circle');
        if (n > items.length) {
            slideValue = 1
        }
        if (n < 1) {
            slideValue = items.length
        }
        for (i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
        }
        for (i = 0; i < circles.length; i++) {
            circles[i].className = circles[i].className.replace('active', '');
        }
        items[slideValue - 1].style.display = 'block';
        circles[slideValue - 1].className += ' active';
    }

});


