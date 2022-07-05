//Variables de la API
const url = "https://api.github.com/users/";

//Variables del DOM
const get = (parametro) => document.getElementById(`${parametro}`);

const barraBusqueda = get("barraBusqueda");
const perfilContainer = get("perfilContainer");
const btnMode = get("btnMode");
const modoTexto = get("modoTexto");
const modeIcon = get("modeIcon");
const submit = get("submit");
const input = get("input");
const avatar = get("avatar");
const nombre = get("nombre");
const usuario = get("usuario");
const fecha = get("fecha");
const bio = get("bio");
const repos = get("repos");
const seguidores = get("seguidores");
const siguiendo = get("siguiendo");
const ubicacion = get("ubicacion");
const web = get("web");
const twitter = get("twitter");
const empresa = get("empresa");
const noresults = get("noresults");
const meses = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];

//Botón de búsqueda
submit.addEventListener("click", function () {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    });

//Input
input.addEventListener(
      "keydown",
      function (e) {
        if (!e) {
          var e = window.event;
        }
        if (e.key == "Enter") {
          if (input.value !== "") {
            getUserData(url + input.value);
          }
        }
      },
      false
    );
    input.addEventListener("input", function () {
      noresults.style.display = "none";
      perfilContainer.classList.remove("active");
      barraBusqueda.classList.add("active");
    });

//functions
function getUserData(gitUrl) {
      fetch(gitUrl)
        .then((response) => response.json())
        .then((data) => {
          updateProfile(data);
        })
        .catch((error) => {
          throw error;
        });
    }

    function updateProfile(data) {
      if (data.message !== "No se encuentra") {
        noresults.style.display = "none";
        function checkNull(param1, param2) {
          if (param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return "No disponible";
          } else {
            return `${param1}`;
          }
        }
        avatar.src = `${data.avatar_url}`;
        nombre.innerText = `${data.name}`;
        usuario.innerText = `@${data.login}`;
        datesegments = data.created_at.split("T").shift().split("-");
        fecha.innerText = `Entró en ${datesegments[2]} ${
          meses[datesegments[1] - 1]
        } ${datesegments[0]}`;
        bio.innerText =
          data.bio == null ? "Este perfil no tiene bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        seguidores.innerText = `${data.followers}`;
        siguiendo.innerText = `${data.following}`;
        ubicacion.innerText = checkNull(data.location, user_location);
        web.innerText = checkNull(data.blog, page);
        twitter.innerText = checkNull(data.twitter_username, twitter);
        empresa.innerText = checkNull(data.company, company);
        barraBusqueda.classList.toggle("active");
        perfilContainer.classList.toggle("active");
      } else {
        noresults.style.display = "block";
      }
    }