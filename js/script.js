const siteUrl  = "https://www.balldontlie.io/api/v1/";
const playerUrl = `${siteUrl}players/`;
const teamUrl   = `${siteUrl}teams/`
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getListPlayers() {
    title.innerHTML = "<p><center>Daftar Pemain NBL<center></P>"
    fetch(playerUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let datapemain ="";
            resJson.data.forEach(pemain => {
                datapemain +=`
                <tr>
                    <td style="padding-left:5px;"></td>
                    <td>${pemain.first_name}</td>
                    <td>${pemain.last_name}</td>
                    <td>${pemain.position}</td>
                    <td>${pemain.height_feet}</td>
                    <td>${pemain.height_inches}</td>
                    <td>${pemain.weight_pounds}</td>
                </tr>             
                `
            });
            contents.innerHTML =`
                <div class="card">
                <table class="stripped responsive-table">
                    <thead>
                        <th></th>
                        <th>Nama Depan</th>
                        <th>Nama Belakang</th>
                        <th>Posisi</th>
                        <th>Tinggi Kaki</td>
                        <th>Tinggi Inchi</td>
                        <th>Berat</td>
                    </thead>
                    <tbody>
                        ${datapemain}
                    </tbody>
                </table>
                </div>
            `
        }).catch(err =>{
            console.error(err);
        })
}

function getListTeams() {
    title.innerHTML = "<p><center>Daftar Tim NBL<center></P>"
    fetch(teamUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let datateam ="";
            resJson.data.forEach(team => {
                datateam +=`
                <tr>
                    <td style="padding-left:5px;"></td>
                    <td>${team.full_name}</td>
                    <td>${team.name}</td>
                    <td>${team.division}</td>
                    <td>${team.conference}</td>
                    <td>${team.city}</td>
                </tr>             
                `
            });
            contents.innerHTML =`
                <div class="card">
                <table class="stripped responsive-table">
                    <thead>
                        <th></th>
                        <th>Full Name</th>
                        <th>Name</th>
                        <th>Division</th>
                        <th>Conference</th>
                        <th>City</th>
                    </thead>
                    <tbody>
                        ${datateam}
                    </tbody>
                </table>
                </div>
            `
        }).catch(err =>{
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "player":
            getListPlayers();
            break;
        case "team":
            getListTeams();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    
    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })

    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "player";
    loadPage(page);
});