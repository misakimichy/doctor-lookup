import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import * as api from './api';
import { Data } from './parse';

const clearResult = () => {
  if($("#doctor-info").children().length > 0 ) {
    $("#doctor-info").children().remove();
  } else {
    return;
  }
};

const processSearch = (searchFunc, inputElem, event) => {
  event.preventDefault();
  clearResult();
  const userSymptomSearch = inputElem.val();
  const formattedInput = userSymptomSearch.replace(/\s+/g, '-').toLowerCase();
  const promise = searchFunc(formattedInput);
  if(formattedInput == "") {
    $("#doctor-info").prepend(`<p>Please enter something to see a doctor list.</p>`);
  } else {
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
}; 

// Call APi and show the proper result to user
$(document).ready(function(){
  $("#search-symptom").submit(function(event){
    processSearch(api.searchDoctorBySymptom, $("#symptom-input"), event);
  });

  $("#search-name").submit(function(event){
    processSearch(api.searchDoctorByName, $("#name-input"), event);
  });
});