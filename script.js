
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
            //subcategory.items.forEach(function (item) {
                imgList += `<div class="item"><img src="${data[i].subcategories[i].items[i].imagelink}" ></div>`;
            //})
        } 
            console.log(imgList);
            $('#slideshow').append(imgList);
    });
    
    //show product details from home page
    $('#slideshow').on('click', '.item', function(item) {
        sessionStorage.setItem('itemName', item.target.id);
        sessionStorage.setItem('subcategory', JSON.stringify(subcategory1));
        window.location = 'product.html';
        return false;
    });
    

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
        // console.log(category) 
            category.subcategories.forEach(function (subcategory) { 
                if (subcategory.name === categoryName) { 
                    foundSubcategory = subcategory;
                }
            })
        })
        return foundSubcategory;  
    }
    let subcategory1 = [];
    var cart = [];
    function attachToDOM(subcategory) {
    subcategory1 = subcategory
        $('#items').html(''); 
        if (!subcategory.items.length) { 
            $('#subcategoryName').html(subcategory.name); 
            $('#items').text('There are no items in stock');
        }
        else { 
            let output = '';
            subcategory.items.forEach(function (item) {
                output += `
                <div class="col-md-3 items">
                    <div class='photo'>
                        <img src="${item.imageLink}" id="${item.name}">
                    </div>
                    <div class="info">
                        <h5>${item.name}</h5>
                        <h5 class="price">$${item.price}</h5>
                        <h6 class="hidden rate">${item.rating}</h6>
                    </div>
                    <div class="add">
                    <button class="btn btn-primary" id="${item.name}">Add to cart</button>
                    </div>
                </div>
                `;
                $('#items').html(output);
            })
        }
    }

    //show product details
    $('#items').on('click', '.photo', function(item) {
    sessionStorage.setItem('itemName', item.target.id);
    sessionStorage.setItem('subcategory', JSON.stringify(subcategory1));
    window.location = 'product.html';
    return false;
    });

    

    
    //add to cart
    $('#items').on('click', '.add', function(item) {
        localStorage.setItem('itemName', item.target.id);
        localStorage.setItem('subcategory', JSON.stringify(subcategory1));
        return false;
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
        displaySlides(slideValue = n);
    }

    $('li#currentSlide1').on('click', function(e){
        e.preventDefault();
        currentSlide(1);
        })

        $('li#currentSlide2').on('click', function(e){
            e.preventDefault();
            currentSlide(2);
            })

            $('li#currentSlide3').on('click', function(e){
                e.preventDefault();
                currentSlide(3);
                })

    function arrowSlide(n) {
        displaySlides(slideValue += n);
    }

    $('a#left').on('click', function(e){
        e.preventDefault();
        arrowSlide(-1);
        })
    
        $('a#right').on('click', function(e){
            e.preventDefault();
            arrowSlide(1);
            })

    var autoSlider;
    $('input#checkbox').on('click', function(){
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
        //circles[slideValue - 1].className += ' active';
    }

});


