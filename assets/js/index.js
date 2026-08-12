// WRITE YOUR JS CODE HERE

// let myHttp = new XMLHttpRequest()
// myHttp.open(
//   "get",
// ,
// );

// myHttp.send()
// myHttp.response()

const launchesUrl =
  "https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=10";

let todayInSpace = document.getElementById("today-in-space");
let launches = document.getElementById("launches");
let planets = document.getElementById("planets");
let todayInSpaceBtn = document.getElementById("today-in-space-btn");
let launchesBtn = document.getElementById("launches-btn");
let planetsBtn = document.getElementById("planets-btn");
let apodImageContainer = document.getElementById("apod-image-container");
let datelable = document.getElementById("date-lable");

async function getData() {
  try {
    
    var response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=GUpTkODRLPbRLC1mBifTLfp607076PIufGSDUbp4",
    );
    var data = await response.json();
    displayimage(data);
    displaydate(data);
    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

function displayimage(data) {
  let image = `<img
                  id="apod-image"
                  class="w-full h-full object-cover"
                  src="${data.url}"
                  alt="Astronomy Picture of the Day"
                />`;

  apodImageContainer.innerHTML = image;
}

function displaydate(data) {
  let lable = `<span class="text-sm">${data.date}</span>`;
  datelable.innerHTML = lable;
}
getData();

todayInSpaceBtn.addEventListener("click", function () {
  todayInSpace.classList.remove("hidden");
  launches.classList.add("hidden");
  planets.classList.add("hidden");
  todayInSpaceBtn.classList.add("bg-blue-500/10", "text-blue-400");
  launchesBtn.classList.remove("bg-blue-500/10", "text-blue-400");
  planetsBtn.classList.remove("bg-blue-500/10", "text-blue-400");
});

launchesBtn.addEventListener("click", function () {
  todayInSpace.classList.add("hidden");
  launches.classList.remove("hidden");
  planets.classList.add("hidden");
  todayInSpaceBtn.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesBtn.classList.add("bg-blue-500/10", "text-blue-400");
  planetsBtn.classList.remove("bg-blue-500/10", "text-blue-400");
});

planetsBtn.addEventListener("click", function () {
  todayInSpace.classList.add("hidden");
  launches.classList.add("hidden");
  planets.classList.remove("hidden");
  todayInSpaceBtn.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesBtn.classList.remove("bg-blue-500/10", "text-blue-400");
  planetsBtn.classList.add("bg-blue-500/10", "text-blue-400");
});
async function getLaunches() {
  try {
    const response = await fetch(launchesUrl);
    const data = await response.json();
    const featuredCardResult = data.results[0];
    featuredCard(featuredCardResult);
    staticCards(data.results);
  } catch (error) {
    console.log(error);
  }
}
getLaunches();

function featuredCard(data) {
  let mainCard = `
   <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${data.status.name}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${data.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${data.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${data.rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${new Date(data.net).toLocaleDateString()}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${new Date(data.net).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${data.pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${data.pad.location.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      The third integrated flight test of Starship. The
                      prototype for the heavy-lift launch vehicle is currently
                      being built by SpaceX.
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    >
                    <img src="${data.image.image_url}" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </div>


  `;

  document.getElementById("static-featured-launch").innerHTML = mainCard;
}

function staticCards(data) {
  let box =""
  for (let i = 0; i < data.length; i++) {
    box += `
    <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden"
              >
                <img src="${data[i].image.image_url}" alt="${data[i].rocket.configuration.name}"
                class="w-full h-full object-cover"/>
                <i class="fas fa-space-shuttle text-5xl text-slate-700"></i>
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${data[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4 id="card-${i}"
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${data[i].rocket.configuration.full_name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${data[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(data[i].net).toLocaleDateString()}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(data[i].net).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                   <span class="text-slate-300">${data[i].rocket.configuration.full_name}</span>                  </div>
                   <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${data[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            `;

          }
          document.getElementById("launches-grid").innerHTML = box;
}
