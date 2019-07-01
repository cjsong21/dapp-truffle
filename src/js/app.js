App = {
  web3Provider: null,
  contracts: {},
	
  init: function() {
   
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') { 
      App.web3Provider = web3.currentProvider; 
      web3 = new Web3(App.web3Provider); 
      console.log('metamask' + web3);
    } else { 
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545'); 
      web3 = new Web3(App.web3Provider); 
      console.log('ganache' + web3);
    } 
    return App.initContract();
  },

  initContract: function() {
		$.getJSON('Coursetro.json', function (data) { 
      App.contracts.Coursetro = TruffleContract(data); 
      App.contracts.Coursetro.setProvider(App.web3Provider); 
      //console.log(App.contracts.Coursetro);
      return App.getInstructor(); 
    });
  },
  getInstructor: function() { 
    App.contracts.Coursetro.deployed().then(function (instance) { 
      return instance.getInstructor.call(); 
    }).then(function (result) { 
      console.log(result[0], result[1]);
      $("#instructor").html(web3.toUtf8(result[0])+' ('+result[1]+' years old)'); 
      //$("#instructor").html(web3.toHex(result[0])+' ('+result[1]+' years old)'); 
    }).catch(function (err) { 
        console.log(err.message); 
    }) 
  },
  setInstructor: function () {
    varname = $('#name').val();
    varage = $('#age').val();
    App.contracts.Coursetro.deployed().then(function (instance) {
      //return instance.setInstructor(web3.toHex(varname), varage);
      return instance.setInstructor(web3.toHex(varname), varage);
    }).then(function () {
      $('#name').val('');
      $('#age').val('');
      return App.getInstructor();
    }).catch(function (err) {
      console.log(err.message);
    })
  },
  buyRealEstate: function() {	

  },

  loadRealEstates: function() {
	
  },
	
  listenToEvents: function() {
	
  }
};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });

  $("#button").click(function () {
    App.setInstructor();
  });
});
