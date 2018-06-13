var click_num = 0;
var win = false;
var table_datum;

window.onload = function() {
  table_datum = document.querySelectorAll("td");
  bind_events();
};

function check_win() {
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
    var reset_button = document.createElement("btn");
    reset_button.innerText = "Reset";
    document.getElementsByTagName("body")[0].appendChild(reset_button);
    reset_button.outerHTML = "<center class='margin_top'>"+reset_button.outerHTML+"</center>";
    bind_reset_events();
  }

}

function bind_reset_events(){
  var reset_button = document.getElementsByTagName("btn");
  reset_button[0].addEventListener("mouseover", function(){
    this.style.background = "#cf1616";
  });
  reset_button[0].addEventListener("mouseleave", function(){
    this.style.background = "#f91a1a";
  });
  reset_button[0].addEventListener("click", function(){
    reset_button[0].remove();
    reset_board();
  });
}

function reset_board() {
  win = false;
  click_num = 0;
  table_datum.forEach(function(e){
    if(e.hasChildNodes()){
      e.removeChild(e.childNodes[0]);
      e.style.background = "transparent";
    }
  });
}

function check_row_col_diag(num1, num2, num3){
  if((table_datum[num1].innerHTML.search("X") !=  -1 &&
    table_datum[num2].innerHTML.search("X") != -1 &&
    table_datum[num3].innerHTML.search("X") != -1) ||
    (table_datum[num1].innerHTML.search("O") !=  -1 &&
    table_datum[num2].innerHTML.search("O") != -1 &&
    table_datum[num3].innerHTML.search("O") != -1)){
      win = true;
      table_datum[num1].style.background = "red";
      table_datum[num2].style.background = "red";
      table_datum[num3].style.background = "red";
    }
}


function bind_events() {
  document.querySelectorAll("td").forEach(function(e) {
      e.addEventListener("mouseover", function(){
        if(!win)
        this.style.background = "rgba(14, 175, 194, .5)";
      });
      e.addEventListener("mouseleave", function(){
        if(!win)
        this.style.background = "transparent";
      });
      e.addEventListener("click", function(){
        if(!win && this.innerHTML.search("img") == -1){
          click_num += 1;
          var img_to_add = document.createElement("img");
          img_to_add.setAttribute("src", click_num % 2 == 0 ? "assets/textures/O.png" : "assets/textures/X.png");
          this.appendChild(img_to_add);
          check_win();
        }
      });
    });
  }
