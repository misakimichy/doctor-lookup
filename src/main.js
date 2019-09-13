import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

// Frontend logic
$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();
    $("#result").show();
  });
});