var ready_config_Entry = "";
var ready_config_High = "";
angular.module('configApp', []).controller('myCtrl', function($scope, $http) {
    //this can be pulled and put into a angular service
    $http.get('data.json')
        .then(function(res) {
            $scope.data = res.data;

            /*var button_logic_Data = $scope.data[2].ViCase;
            $scope.buttonIdArray = [];

            angular.forEach(button_logic_Data, function(value, index) {
                var hello = value.yourChoice
                angular.forEach(value.yourChoice, function(value, index) {
                    var buttonId = value.name.replace(/\s+/g, '-').toLowerCase();
                    $scope.buttonIdArray.push(buttonId);
                });*/
                /*angular.forEach(value.Logic,function(value,index){
                    console.log(value);

                    $scope.logic = value;
                });*/
            //});
            console.log($scope.buttonIdArray);
        });

      $http.get('ready-config.json').then(function(res) {
        $scope.config = res.data;
        ready_config_High = $scope.config.High;
        ready_config_Entry = $scope.config.Entry;
      });


    $scope.domloaded = function() {
      console.log('hello');
        setTimeout(function(){
          runjquery();
          // is this line of code clean ??

        }, 10);
    };



});


var runjquery = function() {
    console.log('jQuery!');
    $('#chapter-4').addClass('third');
    /*function hello (argument) {
        $('input[type="radio"]').each(function() {
          alert('hello');
        });
    };*/
    var prizeString = "";
    $('input[type="radio"]').each(function() {

        prizeString = "";

        if ($(this).val() != 0) {
            prizeString = $(this).val();

            $(this).next('span').prepend("$" + prizeString + " US - ");
        }

    });





    $('input[type="radio"], select option').click(function() {
        var result = $('input[type=radio]:checked, select option:selected');
        if (result.length > 0) {
            var radioCheckedNumber = result.length + " items in cart<br>";
            var resultString = "";
            var total = 0;
            var noneNumber = 0;
            var villageSum = 0;
            var thirdSum = 0;
            var imageUrl = "";
            var findImg = $(this).closest('.col-sm-8').prev('.col-sm-2');
            var last_Id;
            var last_Name;
            var now_Id;
            var now_Name;
            var data_child;

            imageUrl = "";
            imageUrl = $(this).attr('imgAttr');
            if (!$(this).hasClass('None')) {
                if(findImg.hasClass('noImg')){

                    findImg.removeClass('noImg');
                    findImg.append('<img>');
                    findImg.find('img').attr('src', imageUrl);
                } else {

                    findImg.find('img').attr('src', imageUrl);
                }
            } else {
                findImg.find('img').remove();
                findImg.addClass('noImg');
            }

            if($(this).attr('for') == "Entry") {
              loopReadyConfig(ready_config_Entry);
            } else if($(this).attr('for') == "High") {
              loopReadyConfig(ready_config_High);
            }

            function loopReadyConfig (value) {
              angular.forEach(value, function (value, index) {
                $(value).find('input[type=radio]').prop('checked','true');
              });
            }

            $('input[type=radio]').each(function() {



                //New Feature Child Button Deselect Logic
                //On change choice of Button in Parent
                //Deselect choice of button in child
                //Change Section Icon of Child to: "Attention-Phoenix-Sign". → Attention-Phoenix-Sign


                if ($(this).is(':checked')) {

                } else {
                    var test = $(this).data('child');
                    angular.forEach(test, function(value, index) {
                        $(value).find('input[type=radio]').prop("disabled", false);
                        $(value).find('span').removeClass('ghost');
                    });
                    //$(test).find('input[type=radio]').prop( "disabled", false );
                }
            });

            result.each(function() {
                // This function loops through all checked radio buttons. This function does a lot:
                //    1. Calculate the cost summery
                //    2. Update the Section Icon
                //    3. Update enabling / disabling of child radio buttons

                //alert($(this).val());
                total += parseInt($(this).val());

                var selectedText = $(this).next('span').text();

                data_child = $(this).data('child');

                var Content_Active_Choice = $(this).next().text();

                var Section_Name = $(this).closest('.col-sm-8').find('h3').find('span').text();


                //console.log(data_child);

                angular.forEach(data_child, function (value, index) {
                        $(value).find('input[type=radio]').prop("disabled", true);
                        $(value).find('span').addClass('ghost');
                        var Choice_Tooltip = "To enable this item, please select a choice other than " + Content_Active_Choice + " in " + Section_Name;
                        // This ToolTip is shown when hovering over a choice in the Child Part
                        $(value).find('span').attr('title',Choice_Tooltip);
                        if ($(value).find('input').is(':checked')) {
                            $(value).closest('.col-sm-8').prev().find('img').attr('src','images/expansion/Attention-Phoenix-Sign-tbg-h80px.png').addClass('alert-image');
                            $(value).closest('.col-sm-8').prev().find('img.alert-image').attr('title','You changed your choice in another related part which was not compatible with your choice in this part. Please make new choice. Not available choices are ghosted. The tooltip of the ghosted choice will tell you why')
                            $(value).closest('.readmore_area').find('.None').prop('checked', true);
                        }
                        if($(value).closest('.col-sm-8').prev().find('img').hasClass('alert-image')){

                        }
                });

                //$("#section-3-Button-0").find('input[type=radio]').prop( "disabled", true );

                var Case = "";



                /*$('input[class=case]:checked').each(function() {
                    Case = $(this).attr('case');
                    //alert(Case);

                    $('input[class=cover]:checked').each(function() {

                        if (Case == "2L") {
                            var aimageUrl = $(this).attr('aimgAttr');
                            //alert(aimageUrl);
                            findImg.attr('src', aimageUrl);
                        } else if (Case == "4L") {
                            var bimageUrl = $(this).attr('bimgAttr');
                            //alert(bimageUrl);
                            findImg.attr('src', bimageUrl);
                        } else if (Case == "6L") {
                            var cimageUrl = $(this).attr('cimgAttr');
                            //alert(cimageUrl);
                            findImg.attr('src', cimageUrl);
                        }

                    });
                });*/

                if ($(this).val() != 0) {
                    resultString += selectedText + "<br/>";
                    findImg.removeClass('shade');
                } else if ($(this).val() == 0 && $(this).hasClass('cover')) {
                    noneNumber += 0;
                    findImg.removeClass('shade');
                } else if ($(this).hasClass('None')) {
                    noneNumber += 0;
                } else {
                    noneNumber += 1;
                    radioCheckedNumber = result.length - noneNumber + " items in cart";
                    findImg.addClass('shade');
                    //$('#state').text(noneNumber);
                }

                imageUrl = "";


            });

            var resultString1 = "";
            var resultString2 = "";
            var resultString3 = "";
            var resultString4 = "";

            $('#chapter-2 input[type=radio]:checked').each(function () {
                var selectedText = $(this).next('span').text();

                if(!$(this).hasClass('None')) {
                    resultString1 += selectedText + "<br/>";
                }
            });

            $('#chapter-3 input[type=radio]:checked').each(function () {
                var selectedText = $(this).next('span').text();

                if(!$(this).hasClass('None')) {
                    resultString2 += selectedText + "<br/>";
                }

            });

            $('#chapter-4 input[type=radio]:checked').each(function () {
                var selectedText = $(this).next('span').text();

                if(!$(this).hasClass('None')) {
                    resultString3 += selectedText + "<br/>";
                }

            });

            $('#chapter-5 input[type=radio]:checked').each(function () {
                var selectedText = $(this).next('span').text();

                if(!$(this).hasClass('None')) {
                    resultString4 += selectedText + "<br/>";
                }
            });



            $('.village input[type=radio]:checked').each(function() {
                villageSum += parseInt($(this).val());
                $('#villageSum').text('$' + villageSum + ' US');
            });

            $('.third input[type=radio]:checked').each(function() {
                thirdSum += parseInt($(this).val());
                $('#thirdSum').text('$' + thirdSum + ' US');

            });

            if (resultString.length > 0) {
                resultString += "<hr>";
            }

            document.querySelector('#ViCase-resultstring').innerHTML = resultString1;
            document.querySelector('#ViDock-resultstring').innerHTML = resultString2;
            document.querySelector('#PcPart-resultstring').innerHTML = resultString3;
            document.querySelector('#OS-resultstring').innerHTML = resultString4;

            $('#resultstring').html(resultString);

            $('#radiocheckednumber').html(radioCheckedNumber);
            $('#total').html('$' + total);
        } else {
            $('#divResult').html("No radio button is checked");
        }
    });

    /*$('input[type="radio"], select option').click(function() {
        now_Id = $(this).closest('div').attr('id');
        now_Name = $(this).attr('name');

        if(now_Id != last_Id && now_Name == last_Name) {
            alert('congruate');
            var test2 = '#' + last_Id;
            console.log(test2);
            var test = $(test2).find('input[type=radio]').data('child');
            console.log(test);
            angular.forEach(test,function (value, index) {
                $(value).find('input[type=radio]').prop( "disabled", false );
            });
        }

        last_Id = $(this).closest('div').attr('id');
        last_Name = $(this).attr('name');
    });*/

    $('input[type="radio"], select option').click(function() {

        $('input[type=radio]').each(function() {

        });
    });

    //-----------------------------------------------------
    //Read More
    //-----------------------------------------------------

    /*$('.read-more-target1').hide();
    $('.read-more-target2').hide();
    var readMoreState1 = false;
    var readMoreState2 = false;

    $('.read-more1').click(function(){
        $(this).next().next().slideToggle(0);
        readMoreState1 = !readMoreState1;

        if(readMoreState1 == true) {
            $(this).find('i').addClass('fa-rotate-90');
        } else {
            $(this).find('i').removeClass('fa-rotate-90');
        }
    });


    $('.read-more2').click(function(){
        $(this).next().next().slideToggle();
        readMoreState2 = !readMoreState2;

        if(readMoreState2 == true) {
            $(this).find('i').addClass('fa-rotate-90');
        } else {
            $(this).find('i').removeClass('fa-rotate-90');
        }
    });*/

    $('.readmore_area').hide();
    $('.readmore_area.show-first').show();
    $('.sub-sectionToggle').next().hide();

    $('.readmore_button').click(function() { //when I click a toggle button
        var parent = $(this).parent(".readmore_group");
        var buttons = $(parent).children('.readmore_button');
        var areas = $(parent).children('.readmore_area');
        var idx = $(buttons).index(this);

        if ($(this).hasClass("open")) {
            $(this).removeClass("open").addClass("closed");
            $(areas[idx]).removeClass("open").addClass("closed");
            $(this).find('i').removeClass('fa-rotate-90');
        } else {
            $(this).find('i').addClass('fa-rotate-90');
            $(this).addClass("open").removeClass("closed");
            $(areas[idx]).addClass("open").removeClass("closed");
        }
        $(parent).children('.readmore_area.closed').hide();
        $(parent).children('.readmore_area.open').slideDown();

    });

    $('.radio-tables').find('.tableSection.closed').hide();

    $('.table-tab li a').click(function() {
        var parent = $(this).closest('.radio-tables');
        var buttons = $(parent).children('.table-tab').find('a');
        var areas = $(parent).children('.tableSection');
        var idx = $(buttons).index(this);

        if (!$(this).hasClass("active")) {
            $(buttons).parent().removeClass("active");
            $(this).parent().addClass('active');
            $(areas).removeClass("open").addClass("closed");
            $(areas[idx]).addClass("open").removeClass("closed");
        }
        $(parent).children('.tableSection.closed').hide();
        $(parent).children('.tableSection.open').show();
    });

    $('.sub-sectionToggle').click(toggle);

    $('.collapse-summary').click(toggle);

    function toggle () {
      $(this).next().slideToggle();
      if (!$(this).find('i').hasClass('fa-rotate-90')) {
          $(this).find('i').addClass('fa-rotate-90');
      } else {
          $(this).find('i').removeClass('fa-rotate-90');
      }
    }





    //------------------------------------------------------
    //Acodrian
    //------------------------------------------------------


    $('.con-fig-header').next('.panel-body').hide();


    $('.con-fig-header').click(function() {
        $(this).next(".panel-body").slideToggle();

        if (!$(this).find("i").hasClass("fa-rotate-90")) {
            $(this).find("i").addClass("fa-rotate-90");
        } else {
            $(this).find("i").removeClass("fa-rotate-90");
        }
    });

    $(".AMD-show, .intel-show").hide();

    $("#intel").click(function() {
        $(".show-text").hide();
        $(".AMD-show").hide();

        $(".intel-show").slideDown();
    });

    $("#AMD").click(function() {
        $(".show-text").hide();
        $(".AMD-show").slideDown();

        $(".intel-show").hide();
    });

    var children = $('.GalleryThumbNail > .thumb');
    for (var i = 0, l = children.length; i < l; i += 4) {
        children.slice(i, i + 4).wrapAll('<div class="item"></div>');
    }

    $('.GallerySlideshow > .item:nth-child(1)').addClass('active');
    $('.GalleryThumbNail > .item:nth-child(1)').addClass('active');

    //$('.hide-section').closest('.panel-default').hide();
};

/*var btn = document.querySelectorAll('.collapse-summary');


var number = 0;

for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function() {
    if(number == 0) {
        this.nextElementSibling.style.display = "none";
        this.className += " hello";
        number = 1;
    } else {
      this.nextElementSibling.style.display = "block";
      number = 0;
    }
  });
}
*/