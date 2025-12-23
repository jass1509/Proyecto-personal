
        const cayllomaCoordinates = [-15.6389, -71.6008];
        const districts = ['Achoma', 'Cabanaconde', 'Callalli', 'Caylloma', 'Chivay', 'Coporaque', 'Huambo', 'Huanca', 'Ichupampa', 'Lari', 'Lluta', 'Maca', 'Madrigal', 'Majes', 'San Antonio de Chuca', 'Sibayo', 'Tapay', 'Tisco', 'Tuti', 'Yanque'];

        const contentArea = document.getElementById('contentArea');
        const navLinks = document.querySelectorAll('.main-nav a');

        
        window.onload = () => {
            initMap();
            fetchProvinciaInfo(); 
        };

        function initMap() {
            const map = L.map('map').setView(cayllomaCoordinates, 9);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(map);
            L.marker(cayllomaCoordinates).addTo(map)
                .bindPopup('<b>Chivay</b><br>Capital de Caylloma').openPopup();
        }

        function showError(msg) {
            contentArea.innerHTML = `<div class="error-message"> ${msg}</div>`;
        }

        function setActiveLink(id) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        }

        
        document.getElementById('btnInfoProvincia').onclick = (e) => { e.preventDefault(); setActiveLink('btnInfoProvincia'); fetchProvinciaInfo(); };
        document.getElementById('btnDistritos').onclick = (e) => { e.preventDefault(); setActiveLink('btnDistritos'); showDistricts(); };
        document.getElementById('btnTurismo').onclick = (e) => { e.preventDefault(); setActiveLink('btnTurismo'); fetchTurismoInfo(); };
        document.getElementById('btnGeografia').onclick = (e) => { e.preventDefault(); setActiveLink('btnGeografia'); fetchGeografiaInfo(); };
        document.getElementById('btnHistoria').onclick = (e) => { e.preventDefault(); setActiveLink('btnHistoria'); fetchHistoriaInfo(); };

        // fecht 
        async function getWikiData(searchQuery) {
            const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&srlimit=1`;
            const res = await fetch(searchUrl);
            const data = await res.json();
            if (data.query.search.length === 0) throw new Error();
            
            const pageId = data.query.search[0].pageid;
            const contentUrl = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${pageId}&format=json&origin=*`;
            const contentRes = await fetch(contentUrl);
            const contentData = await contentRes.json();
            return {
                extract: contentData.query.pages[pageId].extract,
                title: data.query.search[0].title
            };
        }

        async function fetchProvinciaInfo() {
            contentArea.innerHTML = '<div class="loading"> Cargando...</div>';
            try {
                const data = await getWikiData("Provincia de Caylloma");
                contentArea.innerHTML = `
                    <div class="info-panel">
                        <h2> Información General</h2>
                        <p>${data.extract.substring(0, 800)}...</p>
                        <a class="wiki-link" href="https://es.wikipedia.org/wiki/${data.title}" target="_blank">Leer más en Wikipedia</a>
                    </div>`;
            } catch (e) { showError("Error al conectar con Wikipedia"); }
        }

        function showDistricts() {
            contentArea.innerHTML = `
                <div class="info-panel">
                    <h2> Distritos</h2>
                    <div class="districts-grid">
                        ${districts.map(d => `<div class="district-item">${d}</div>`).join('')}
                    </div>
                </div>`;
        }

        async function fetchTurismoInfo() {
            contentArea.innerHTML = '<div class="loading"> Cargando atractivos...</div>';
            try {
                const data = await getWikiData("Turismo en el Valle del Colca");
                contentArea.innerHTML = `<div class="info-panel"><h2> Turismo</h2><p>${data.extract.substring(0, 600)}...</p></div>`;
            } catch (e) { showError("Error de carga"); }
        }

        async function fetchGeografiaInfo() {
            contentArea.innerHTML = '<div class="loading"> Cargando geografía...</div>';
            try {
                const data = await getWikiData("Geografía de Arequipa Caylloma");
                contentArea.innerHTML = `<div class="info-panel"><h2> Geografía</h2><p>${data.extract.substring(0, 600)}...</p></div>`;
            } catch (e) { showError("Error de carga"); }
        }

        async function fetchHistoriaInfo() {
            contentArea.innerHTML = '<div class="loading"> Cargando historia...</div>';
            try {
                const data = await getWikiData("Cultura Collaguas y Cabanas");
                contentArea.innerHTML = `<div class="info-panel"><h2> Historia</h2><p>${data.extract.substring(0, 600)}...</p></div>`;
            } catch (e) { showError("Error de carga"); }
        }