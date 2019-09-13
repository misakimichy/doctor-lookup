import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { parseData, Data } from './parse';
import { DoctorSearch } from './api';

// Call APi and show the proper result to user
$(document).ready(function(){
  $("form").submit(function(event){
    event.preventDefault();

    const userInput = $("#medical-concern").val();
    const doctorSearch = new DoctorSearch();
    const promise = doctorSearch.getDoctorBySymptom(userInput);

    promise.then(result => {
      const output = JSON.parse(result);
      const data = new Data(output);
      data.parseData(output);
    }).catch(error => {
      console.log(error);
    })

    // $("#result").show();
  });
});