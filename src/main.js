import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorSearch } from './api';
import { Data } from './parse';

const clearResult = () => {
  if($("#doctor-info").children().length > 0 ) {
    $("#doctor-info").children().remove();
  } else {
    return;
  }
};

// Call APi and show the proper result to user
$(document).ready(function(){
  $("#search-symptom").submit(function(event){
    event.preventDefault();
    clearResult();
    const userSymptomSearch = $("#symptom-input").val();
    //Replace white space with hyphen and make it to lower case.
    const formattedInput = userSymptomSearch.replace(/\s+/g, '-').toLowerCase();
    if(formattedInput == "") {
      $("#doctor-info").prepend(`<p>Please enter something to see a doctor list.</p>`);
    } else {
      const doctorSearch = new DoctorSearch();
      const promise = doctorSearch.searchDoctorBySymptom(formattedInput);
      promise.then(function(response) {
        const body = JSON.parse(response);
        const data = new Data(body);
        data.getDoctorList();
      }, function(error) {
        console.log(error);
      });
    }
    $("input").val("");
    $("#result").show();
  });

  $("#search-name").submit(function(event){
    event.preventDefault();
    clearResult();
    const userSymptomSearch = $("#name-input").val();
    const formattedInput = userSymptomSearch.replace(/\s+/g, '-').toLowerCase();
    if(formattedInput == "") {
      $("#doctor-info").prepend(`<p>Please enter something to see a doctor list.</p>`);
    } else {
      const doctorSearch = new DoctorSearch();
      const promise = doctorSearch.searchDoctorByName(formattedInput);
      promise.then(function(response) {
        const body = JSON.parse(response);
        const data = new Data(body);
        data.getDoctorList();
      }, function(error) {
        console.log(error);
      });
    }
    $("input").val("");
    $("#result").show();
  });
});