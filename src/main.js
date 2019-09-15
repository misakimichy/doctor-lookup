import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorSearch } from './api';
import { Data } from './parse';

// Call APi and show the proper result to user
$(document).ready(function(){
  $("#search-concern").submit(function(event){
    event.preventDefault();

    const userInput = $("#medical-concern").val();
    //Replace white space with hyphen and make it to lower case.
    const formattedInput = userInput.replace(/\s+/g, '-').toLowerCase();
    const doctorSearch = new DoctorSearch();
    const promise = doctorSearch.searchDoctorBySymptom(formattedInput);
    promise.then(function(response) {
      const body = JSON.parse(response);
      const data = new Data(body);
      data.getData();
  
    }, function(error) {
      console.log(error);
    });
    $("#result").show();
  });
});