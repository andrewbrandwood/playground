(function() {
  'use strict';

    window.donationTargetState = function(apiUrl){

      this.setApiUrl(apiUrl);
      return this.init();
    };

    donationTargetState.prototype.setApiUrl = function(apiUrl) {
      this.apiUrl = apiUrl;
    };

    donationTargetState.prototype.getValues = function(){
      var self = this;
      return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open('GET', self.apiUrl, true);
        request.onload = function(){
          if(request.status == 200){
            resolve(JSON.parse(request.responseText));
          }else{
            reject(Error(request.statusText));
          }
        };

        request.onerror = function() {
          reject(Error("Network Error"));
        };

        request.send();
      });

    };

    donationTargetState.prototype.showElement = function(){
      var indicator = document.querySelector('[data-target-indicator]');
      indicator.classList.add('show');
    };

    donationTargetState.prototype.setValues = function(values){
      var runningTotal = document.querySelector('[data-donation-running-total]');
      var target = document.querySelector('[data-donation-target]');
      var indicator = document.querySelector('[data-target-bar-indicator]');
      indicator.style.width = '80%';
      runningTotal.innerHTML = values.raised;
      target.innerHTML = values.target;
    };

    donationTargetState.prototype.calculateVisual = function(){
      var self = this;
      this.getValues()
      .then(function(response){
        self.setValues(response);
        self.showElement();
      }, function(error){
        console.error('error', error);
      });
    };

    donationTargetState.prototype.init = function() {
      this.calculateVisual();
    };

  }());
