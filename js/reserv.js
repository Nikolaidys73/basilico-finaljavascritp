var app = new function() {
        var vuelo1 = {
          origen: "Buenos Aires",
          destino: "Salta",
          hora: new Date(2023, 4, 15, 12),
          costobase: 500,
          costoneto: 0,
          reservas: []
        };
        var vuelo2 = {
          origen: "Cordoba",
          destino: "Buenos Aires",
          hora: new Date(2023, 4, 28, 7, 30),
          costobase: 450,
          costoneto: 0,
          reservas: []
        };
        var vuelo3 = {
          origen: "Buenos Aires",
          destino: "Usuhuia",
          hora: new Date(2023, 4, 21, 18),
          costobase: 600,
          costoneto: 0,
          reservas: []
        };
        var vuelo4 = {
          origen: "Rio Negro",
          destino: "ROsario",
          hora: new Date(2023, 4, 28, 6, 50),
          costobase: 550,
          costoneto: 0,
          reservas: [1078]
        };
        var vuelo5 = {
          origen: "Sauce Viejo",
          destino: "Mar del plata", 
          hora: new Date(2023, 5, 1, 19, 30),
          costobase: 200,
          costoneto: 0,
          reservas: []
        };
        this.vuelos = [vuelo1, vuelo2, vuelo3, vuelo4, vuelo5];
        for (var i = 0; i < this.vuelos.length; i++) {
          var aumentomanana = 0;
          var aumentofindesemana = 0;
          if (this.vuelos[i].hora.getHours() <= 12) {
            aumentomanana = this.vuelos[i].costobase * 0.10; 
          }
          if (this.vuelos[i].hora.getDay() == 5 || this.vuelos[i].hora.getDay() == 6) {
            aumentofindesemana = this.vuelos[i].costobase * 0.10; 
          }
          this.vuelos[i].costoneto = this.vuelos[i].costobase + aumentomanana + aumentofindesemana;
        }
  
        this.mostrarVuelos = function() {
          var data = '<br>';
          if (this.vuelos.length > 0) {
            for (i = 0; i < this.vuelos.length; i++) {
              var hora = this.vuelos[i].hora.getHours() < 10 ? '0' + this.vuelos[i].hora.getHours() : this.vuelos[i].hora.getHours();
              var minutos = this.vuelos[i].hora.getMinutes() < 10 ? '0' + this.vuelos[i].hora.getMinutes() : this.vuelos[i].hora.getMinutes();
              data += '<tr>';
              data += '<td>Vuelo # '+ (i+1) + ' ORIGEN: ' + this.vuelos[i].origen + ', DESTINO: ' + this.vuelos[i].destino + ', SALIDA: ' + this.vuelos[i].hora.toDateString() + " " + hora + ":" + minutos + '</td>';
              data += '<td><button onclick="app.Reservar(' + i + ')">Reservar</button></td>';
              data += '</tr>';
            }
          }
          document.getElementById('vuelos').innerHTML = data;
          document.getElementById('vuelos').style.display = 'block';
        };

        this.Reservar = function (item) {
          var el = document.getElementById('documento');
          document.getElementById('documento').value = "";
          document.getElementById('datosvuelo').style.display = 'block';
          document.getElementById('vuelos').style.display = 'none';
          document.getElementById('menu1').style.display = 'none';
          document.getElementById('menu2').style.display = 'none';
          document.getElementById('btnback').style.display = 'block';

          var impuesto = this.vuelos[item].costobase == this.vuelos[item].costoneto ? '' : 'Impuesto ma??ana y/o fin de semana'; 
          var hora = this.vuelos[item].hora.getHours() < 10 ? '0' + this.vuelos[item].hora.getHours() : this.vuelos[item].hora.getHours();
          var minutos = this.vuelos[item].hora.getMinutes() < 10 ? '0' + this.vuelos[item].hora.getMinutes() : this.vuelos[item].hora.getMinutes();

          document.getElementById('datosvuelo').innerHTML = "VUELO # " + (item + 1) + ":<br>ORIGEN: " + this.vuelos[item].origen + '<br>DESTINO: ' + this.vuelos[item].destino + '<br>SALIDA: ' + this.vuelos[item].hora.toDateString() + " " + hora + ":" + minutos + '<br>PRECIO BASE: $' + this.vuelos[item].costobase + '<br>PRECIO NETO: $' + this.vuelos[item].costoneto + " " + impuesto;
          document.getElementById('campodoc').style.display = 'block';
          self = this;
          document.getElementById('reserva-edit').onsubmit = function() {
            var d = el.value * 1;
            if (isNaN(d) || d == 0) {
              window.alert("Ingrese un dato correcto");
            }else{
              var flag = false;
              for (j = 0; j < self.vuelos.length; j++) {
                var auxDoc = self.vuelos[j].reservas.indexOf(d)
                if (auxDoc != -1) {
                  if (self.vuelos[j].hora.getFullYear() == self.vuelos[item].hora.getFullYear() &&
                    self.vuelos[j].hora.getMonth() == self.vuelos[item].hora.getMonth() &&
                    self.vuelos[j].hora.getDate() == self.vuelos[item].hora.getDate()) {
                    flag = true;
                    break;
                  }
                }
              }
              if (flag) {
                window.alert("Error: usted ya tiene reservado un vuelo para esta fecha");
              }else{
                self.vuelos[item].reservas.push(d);
                window.alert("Vuelo reservado correctamente");
                document.getElementById('menu1').style.display = 'block';
                document.getElementById('menu2').style.display = 'block';
                document.getElementById('datosvuelo').style.display = 'none';
                document.getElementById('campodoc').style.display = 'none';

                document.getElementById('btnback').style.display = 'none';
              }
            }
          }
        };

        this.consultarReserva = function () {
          var el = document.getElementById('docConsulta');
          var d = el.value * 1;
          if (isNaN(d) || d == 0) {
              window.alert("Ingrese un dato correcto");
          }else{
            var data = '<br>VUELOS RESERVADOS DE ' + d;
            for (i = 0; i < this.vuelos.length; i++) {
              var auxDoc = this.vuelos[i].reservas.indexOf(d)
              if (auxDoc != -1) {
                var hora = this.vuelos[i].hora.getHours() < 10 ? '0' + this.vuelos[i].hora.getHours() : this.vuelos[i].hora.getHours();
                var minutos = this.vuelos[i].hora.getMinutes() < 10 ? '0' + this.vuelos[i].hora.getMinutes() : this.vuelos[i].hora.getMinutes();
                data += '<tr>';
                data += '<td>Vuelo # '+ (i+1) + "= ORIGEN: " + this.vuelos[i].origen + ', DESTINO: ' + this.vuelos[i].destino + ', SALIDA: ' + this.vuelos[i].hora.toDateString() + " " + hora + ":" + minutos + '</td>';
                data += '</tr>';
              }
            }
            if (data == '<br>VUELOS RESERVADOS DE ' + d) {
              window.alert("No existen vuelos asociados a dicho documento");
            }else{
              document.getElementById('menu1').style.display = 'none';
              document.getElementById('menu2').style.display = 'none';
              document.getElementById('vuelos').style.display = 'block';
              document.getElementById('vuelos').innerHTML = data;
              document.getElementById('btnback').style.display = 'block';
            }
          }
        };

        this.Volver = function (){
          document.getElementById('datosvuelo').style.display = 'none';
          document.getElementById('campodoc').style.display = 'none';
          document.getElementById('vuelos').style.display = 'none';
          document.getElementById('btnback').style.display = 'none';
          document.getElementById('menu1').style.display = 'block';
          document.getElementById('menu2').style.display = 'block';
          document.getElementById('docConsulta').value = "";
        };
}