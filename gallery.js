const galleryData = [
    {
        date: "2026-03-05",
        images: [
            {
                file: "P3050084.JPG",
                figure: 1,
                caption: "Dorsal view of juvenile specimen on gray substrate. Carapace scutes visible with faint growth annuli. Scale reference card positioned at left margin for size calibration.",
                exif: { camera: "Olympus E-M10 Mark IV", lens: "60mm", aperture: "f/2.8", shutter: "1/500s", iso: 5000, date: "2026-03-05 17:33:26" }
            },
            {
                file: "P3050090.JPG",
                figure: 2,
                caption: "Right lateral view, anterior-oblique angle. Head extended with yellow temporal stripe prominent against dark integument. Note well-defined claws on forelimbs and subtle marginal pigmentation along the carapace edge.",
                exif: { camera: "Olympus E-M10 Mark IV", lens: "60mm", aperture: "f/2.8", shutter: "1/250s", iso: 6400, date: "2026-03-05 17:33:53" }
            },
            {
                file: "P3050092.JPG",
                figure: 3,
                caption: "In-hand anterior view demonstrating relative body size. Yellow facial markings and dark, granular skin texture of head and neck visible at close range.",
                exif: { camera: "Olympus E-M10 Mark IV", lens: "60mm", aperture: "f/4.0", shutter: "1/160s", iso: 1250, date: "2026-03-05 17:34:29" }
            },
            {
                file: "P3050095.JPG",
                figure: 4,
                caption: "Ventral view showing plastron pattern. Dark central figure on yellow-orange ground color with bilateral symmetry across midline seam. White spotting visible on chin and neck.",
                exif: { camera: "Olympus E-M10 Mark IV", lens: "60mm", aperture: "f/4.0", shutter: "1/640s", iso: 6400, date: "2026-03-05 17:34:50" }
            },
            {
                file: "length-dorsal.png",
                figure: 5,
                caption: "Dorsal view with straight-line carapace length (SCL) measurement along the anterior\u2013posterior axis. SCL = 3.075 cm; body mass = 5.92 g. Calibrated against scale reference card using ImageJ."
            },
            {
                file: "width-dorsal.png",
                figure: 6,
                caption: "Dorsal view with maximum carapace width (SCW) measurement along the lateral axis. SCW = 2.612 cm; body mass = 5.92 g. Calibrated against scale reference card using ImageJ."
            },
        ]
    }
];

function createLightbox() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = '<img>';
    overlay.addEventListener('click', () => overlay.classList.remove('active'));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });
    document.body.appendChild(overlay);
    return overlay;
}

function renderGallery() {
    const container = document.getElementById('gallery');
    const lightbox = createLightbox();
    let exifVisible = localStorage.getItem('exifVisible') === 'true';
    const exifPanels = [];

    // Global EXIF toggle in top-right
    const exifBtn = document.createElement('a');
    exifBtn.href = '#';
    exifBtn.className = 'exif-toggle';
    exifBtn.title = 'Toggle camera settings for all images';
    exifBtn.textContent = 'EXIF';
    if (exifVisible) exifBtn.classList.add('active');
    exifBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        exifVisible = !exifVisible;
        localStorage.setItem('exifVisible', exifVisible);
        exifBtn.classList.toggle('active', exifVisible);
        exifPanels.forEach(p => p.hidden = !exifVisible);
    });
    document.body.appendChild(exifBtn);

    galleryData.forEach(session => {
        const heading = document.createElement('h2');
        heading.textContent = session.date;
        container.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'gallery-grid';

        session.images.forEach(img => {
            const card = document.createElement('figure');
            card.className = 'gallery-card';

            const src = `img/${session.date}/${img.file}`;
            const thumbBase = img.file.replace(/\.[^.]+$/, '.jpg');
            const thumbSrc = `img/${session.date}/thumbs/${thumbBase}`;

            const image = document.createElement('img');
            image.src = thumbSrc;
            image.alt = img.caption;
            image.loading = 'lazy';
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => {
                lightbox.querySelector('img').src = src;
                lightbox.classList.add('active');
            });

            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = `<strong>Fig.&nbsp;${img.figure}.</strong> ${img.caption}`;

            const actions = document.createElement('div');
            actions.className = 'card-actions';

            const fullLink = document.createElement('a');
            fullLink.href = src;
            fullLink.target = '_blank';
            fullLink.className = 'icon-btn';
            fullLink.title = 'Open full-size image';
            fullLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`;
            actions.appendChild(fullLink);
            figcaption.appendChild(actions);

            if (img.exif) {
                const exifPanel = document.createElement('div');
                exifPanel.className = 'exif-panel';
                exifPanel.hidden = !exifVisible;
                const e = img.exif;
                exifPanel.innerHTML =
                    `<table><tbody>` +
                    `<tr><td>Camera</td><td>${e.camera}</td></tr>` +
                    `<tr><td>Focal length</td><td>${e.lens}</td></tr>` +
                    `<tr><td>Aperture</td><td>${e.aperture}</td></tr>` +
                    `<tr><td>Shutter</td><td>${e.shutter}</td></tr>` +
                    `<tr><td>ISO</td><td>${e.iso}</td></tr>` +
                    `<tr><td>Date</td><td>${e.date}</td></tr>` +
                    `</tbody></table>`;
                figcaption.appendChild(exifPanel);
                exifPanels.push(exifPanel);
            }

            card.appendChild(image);
            card.appendChild(figcaption);
            grid.appendChild(card);
        });

        container.appendChild(grid);
    });
}

renderGallery();
