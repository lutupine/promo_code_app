/*
custom script
*/
var saved_hot_deals = null;
var saved_featured_deals = null;
var saved_categories = null;

function apigetdatacall(data_tag, data_limit) {
    $.ajax({
            url: "http://mango-bd.com/API/",
            data: '{"Limit":"'+data_limit+'"}',
            dataType: 'json',
            headers: { 'Api': data_tag, 'Method': 'list' },
            processData: false,
            type: "POST",
            success: function(data) {
                savedata (data_tag, data.result);
                console.log(data);
                switch (data_tag) {
                    case "hot_deals":
                        updatehotdeals (data.result);
                        break;
                    case "featured_deals":
                        updatefeatureddeals (data.result);
                        break;
                    case "categories":
                        updatecategories (data.result);
                        break;
                    default:
                        
                        break;
                }
                //return true;
            },
            error: function(err){
                console.log(err.status);
                //return false;
            }
        });
}

function gethotdeals () {
    if (saved_hot_deals != null) {
        if (saved_hot_deals.length >= 10) {
            updatehotdeals (saved_hot_deals);
        } else {
            apigetdatacall ("hot_deals", 10);
        }
    } else {
        apigetdatacall ("hot_deals", 10);
    }    
}

function getfeatureddeals () {
    if (saved_featured_deals != null) {
        if (saved_featured_deals.length >= 20) {
            updatefeatureddeals (saved_featured_deals);
        } else {
            apigetdatacall ("featured_deals", 20);
        }
    } else {
        apigetdatacall ("featured_deals", 20);
    }    
}

function getcategories () {
    if (saved_categories != null) {
        if (saved_categories.length >= 20) {
            updatecategories (saved_categories);
        } else {
            apigetdatacall ("categories", 20);
        }
    } else {
        apigetdatacall ("categories", 20);
    }
}

function updatehotdeals (deal_data) {
    var slides = $("#hot_deals").find(".deal_container");
    for (var i = 0; i < slides.length; i++) {
        if (i < deal_data.length) {
            $(slides[i]).find("#deal_title").html(deal_data[i].title);
            $(slides[i]).find("#deal_description").html(deal_data[i].description);
            //$(slides[i]).find("#deal_image").attr("src", deal_data[i].image);
            var deal_image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRhPxq16yKv90eHGMRMLs3OR34tI0SaVyxZQ-sxNGeWLILYLb";
            $(slides[i]).find("#deal_image").attr("src", deal_image_url);
        } else {
            $(slides[i]).find("#deal_title").html(deal_data[i - deal_data.length].title);
            $(slides[i]).find("#deal_description").html(deal_data[i - deal_data.length].description);
            //$(slides[i]).find("#deal_image").attr("src", deal_data[i - deal_data.length].image);
            var deal_image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRhPxq16yKv90eHGMRMLs3OR34tI0SaVyxZQ-sxNGeWLILYLb";
            $(slides[i]).find("#deal_image").attr("src", deal_image_url);
        }        
    }
}

function updatefeatureddeals (deal_data) {
    var slides = $("#featured_deals").find(".deal_container");
    if (slides.length > 0) {
        for (var i = 0; i < slides.length; i++) {
            $(slides[i]).find("#deal_title").html(deal_data[i].title);
            $(slides[i]).find("#deal_description").html(deal_data[i].description);
            //$(slides[i]).find("#deal_image").attr("src", deal_data[i].image);
            var deal_image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRhPxq16yKv90eHGMRMLs3OR34tI0SaVyxZQ-sxNGeWLILYLb";
            $(slides[i]).find("#deal_image").attr("src", deal_image_url);
        }
    } else {
        
        for (var i = 0; i < 10; i++) {
            var deal_title = deal_data[i].title;
            var deal_description = deal_data[i].description;
    //      var deal_image_url = deal_data[i].image;
            var deal_image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRhPxq16yKv90eHGMRMLs3OR34tI0SaVyxZQ-sxNGeWLILYLb";
            var segment = '<div class="col-md-6 container-fluid deal_container"><div class="col-xs-3"><img id="deal_image" src="'+deal_image_url+'"></div><div class="col-xs-9"><h1 id="deal_title">'+deal_title+'</h1><p id="deal_description">'+deal_description+'</p></div></div>';
            $("#featured_deals").append(segment);
        }
        
    }    
}

function updatecategories (deal_data) {
    for (var i = 0; i < deal_data.length; i++) {
        var deal_title = deal_data[i].name;
        var deal_description = deal_data[i].description;
//      var deal_image_url = deal_data[i].image;
        var deal_image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRhPxq16yKv90eHGMRMLs3OR34tI0SaVyxZQ-sxNGeWLILYLb";
        var segment = '<div class="col-md-6 container-fluid deal_container"><div class="col-xs-3"><img id="deal_image" src="'+deal_image_url+'"></div><div class="col-xs-9"><h1 id="deal_title">'+deal_title+'</h1><p id="deal_description">'+deal_description+'</p></div></div>';
        $("#deal_categories").append(segment);
    }
}

function savedata(data_key, data_value) {
    var data_string = JSON.stringify (data_value);
    window.localStorage.setItem(data_key, data_string);
}

function getsaveddata () {
    localStorage.clear();
    var data_string1 = window.localStorage.getItem ("hot_deals");
    if (data_string1 != null) {
        var data_value1 = JSON.parse(data_string1);
        saved_hot_deals = data_value1;
        console.log("hot_deals: "+byteCount(data_string1)+"  "+data_value1);
    }
    
    var data_string2 = window.localStorage.getItem ("featured_deals");
    if (data_string2 != null) {
        var data_value2 = JSON.parse(data_string2);
        saved_featured_deals = data_value2;
        console.log("featured_deals: "+byteCount(data_string2)+"  "+data_value2);
    }    
    
    var data_string3 = window.localStorage.getItem ("categories");
    if (data_string3 != null) {
        var data_value3 = JSON.parse(data_string3);
        saved_categories = data_value3;
        console.log("categories: "+byteCount(data_string3)+"  "+data_value3);
    } 
}

function byteCount(s) {
  return (encodeURI(s).split(/%..|./).length - 1) / 1024;
}