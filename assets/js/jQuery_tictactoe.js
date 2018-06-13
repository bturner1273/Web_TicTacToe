var click_num = 0;
var win = false;
var table_datum;

window.onload = function(){
  table_datum = $("td");
  bind_events();
};

function bind_events(){
  table_datum.each(function(){
    $(this).hover(function(){
      if(!win)
      $(this).css("background-color","rgba(14, 175, 194, .5)");
    }, function(){
      if(!win)
      $(this).css("background-color","transparent");
    });
    $(this).click(function(){
      if(!win && $(this).html().search("img") == -1){
        click_num += 1;
        var img_to_add = $("<img></img>");
        img_to_add.attr("src", click_num % 2 == 0 ? "assets/textures/O.png" : "assets/textures/X.png");
        $(this).append(img_to_add);
        check_win();
      }
    });
  });
}

function check_row_col_diag(num1, num2, num3){
  if(($(table_datum[num1]).html().search("X") !=  -1 &&
    $(table_datum[num2]).html().search("X") != -1 &&
    $(table_datum[num3]).html().search("X") != -1) ||
    ($(table_datum[num1]).html().search("O") !=  -1 &&
    $(table_datum[num2]).html().search("O") != -1 &&
    $(table_datum[num3]).html().search("O") != -1)){
      win = true;
      $(table_datum[num1]).css("background", "red");
      $(table_datum[num2]).css("background", "red");
      $(table_datum[num3]).css("background", "red");
    }
}

function check_win(){
  //row 1
  check_row_col_diag(0,1,2);
  //row 2
  check_row_col_diag(3,4,5);
  //row 3
  check_row_col_diag(6,7,8);
  //col 1
  check_row_col_diag(0,3,6);
  //col 2
  check_row_col_diag(1,4,7);
  //col 3
  check_row_col_diag(2,5,8);
  //main diag
  check_row_col_diag(0,4,8);
  //lesser diag
  check_row_col_diag(2,4,6);

  if(!win) {
    if(click_num == 9){
      win = true;
    }
  }

  if(win){
    var reset_button = $("<center class='margin_top'><btn>Reset</btn></center>");
    $("body").append(reset_button);
    bind_reset_events();
  }
}

function bind_reset_events(){
  var btn = $("btn");
  btn.hover(function(){
    $(this).css("background", "#cf1616");
  }, function(){
    $(this).css("background", "#f91a1a");
  });
  btn.click(function(){
    $(this).remove();
    reset_board();
  });
}

function reset_board(){
  win = false;
  click_num = 0;
  table_datum.each(function(){
    if($(this).children().length > 0){
      $(this).children().remove();
      $(this).css("background", "transparent");
    }
  });
}
