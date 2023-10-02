// inicializar o mapa
var map = L.map('map').setView([-8.047562, -34.877002], 13);
var userLocationMarker;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
{
    maxZoom: 19
}).addTo(map);

// adicionar a localização do usuário
navigator.geolocation.getCurrentPosition(function (position)
{
    // pegar coordenadas do usuário
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    var redMarker = L.icon(
        {
            iconUrl: 'assets/icons/marker-icon-red.png',
            iconSize: [25, 41], // Tamanho do ícone
            iconAnchor: [12, 41], // Ponto de ancoragem do ícone
            popupAnchor: [1, -34] // Ponto de ancoragem do popup (se você quiser adicionar um)
        });

    // faz a marcação
    userLocationMarker = L.marker([userLat, userLng], {icon: redMarker}).addTo(map).bindPopup("Você está aqui!").openPopup();
})

// acessar a base de dados
async function loadMarkersFromJSON() 
{
    try 
    {
        // Realize uma solicitação Fetch para o arquivo JSON
        const response = await fetch('academiadacidade.json');
        const dataText = await response.text();

        // Fazer o parse do JSON manualmente
        const data = JSON.parse(dataText);

        // Acesse os registros no JSON e crie marcadores
        for (const record of data.records) 
        {
            const name = record[1];
            const latitude = record[16];
            const longitude = record[17];

            // cria os marcadores
            const marker = L.marker([latitude, longitude]).addTo(map);
            marker.bindPopup(name);
        }
    } 
    catch (error) 
    {
        console.error('Erro ao carregar o arquivo JSON:', error);
    }
}

// Chame a função para carregar os marcadores do JSON
loadMarkersFromJSON();