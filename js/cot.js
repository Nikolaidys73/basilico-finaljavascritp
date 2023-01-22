$.ajax({
    url: 'https://ws.geeklab.com.ar/dolar/get-dolar-json.php',
    dataType: 'json',
    success: function(data) {
          $('#blue').html('$' + data.blue + ' USD');
      $('#oficial').html('$' + data.libre + ' USD');
      }
  });
  

  
