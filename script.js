// Declara as variáveis de latitude e longitude no escopo global
var latitude;
var longitude;

// Função para receber latitude e longitude
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        
        // Após receber as coordenadas, chama a função para inicializar o mapa
        initMap();
        readJSON();
    });
} else {
    // Problema na localização
    alert("Não foi possível usar a localização.");
}

// Função para inicializar o mapa
function initMap() {
    // Verifica se as coordenadas estão definidas
    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
        // Cria um objeto LatLng com as coordenadas
        var coordenadas = new google.maps.LatLng(latitude, longitude);

        // Opções de configuração do mapa
        var mapOptions = {
            center: coordenadas,
            zoom: 15, // Nível de zoom (0 a 21)
        };

        // Cria o objeto do mapa
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Adiciona um marcador para indicar a localização
        var marker = new google.maps.Marker({
            position: coordenadas,
            map: map,
            title: 'Você está aqui'
        });
    } else {
        alert("Latitude e/ou longitude não definidas.");
    }
}

function readJSON()
{
    fetch('academiadacidade.json')
        .then(response => response.json())
        .then(data => 
            {
                console.log(data);
            })
        .catch(error => 
            {
                console.error('Erro ao buscar dados:', error);
            });
}