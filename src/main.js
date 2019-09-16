import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorSearch } from './api';
import { Data } from './parse';

// Call APi and show the proper result to user
$(document).ready(function(){
  $("#search-symptom").submit(function(event){
    event.preventDefault();

    const userSymptomSearch = $("#symptom-input").val();
    //Replace white space with hyphen and make it to lower case.
    const formattedInput = userSymptomSearch.replace(/\s+/g, '-').toLowerCase();
    console.log({formattedInput});
    if(formattedInput == "") {
      $("#result").prepend(`Please enter something to see a doctor list.`);
    } else {
      const doctorSearch = new DoctorSearch();
      const promise = doctorSearch.searchDoctorBySymptom(formattedInput);
      promise.then(function(response) {
        const body = JSON.parse(response);
        const data = new Data(body);
        data.getListBySymptom();
      }, function(error) {
        console.log(error);
      });
    }
    $("#result").show();
  });
  // $("search-name")
});