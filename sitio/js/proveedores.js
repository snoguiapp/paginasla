/* PROVEEDORES (página oculta: no hay ningún enlace hacia ella; se entra escribiendo /proveedores en la dirección).
   Cada línea es:  ['Nombre', 'archivo-del-logo', 'https://sitio-del-proveedor']
   - El logo va en sitio/img/proveedores/archivo-del-logo.png
   - Para poner o cambiar el enlace, edita lo que está entre las terceras comillas.
   - Si dejas '' el logo se muestra pero no es un enlace (no lleva a ningún lado).
   - El nombre del archivo PNG es lo que va entre las segundas comillas de cada línea. */
(function () {
  const DESTACADOS = [
    ['CT Computadoras y Tecnología', 'ct', 'https://ctonline.mx/'],
    ['CVA', 'cva', 'https://www.grupocva.com/'],
    ['EXEL', 'exel', 'https://www.exel.com.mx/'],
    ['Ingram Micro', 'ingram-micro', 'https://mx.ingrammicro.com/cep/app/home'],
    ['American Stock', 'american-stock', 'https://www.americanstock.com/'],
    ['G·LOMA', 'gloma', 'https://glomastore.mx/'],
    ['New Toner', 'new-toner', 'https://newtoner.mx/'],
    ['PCH Mayorista en Tecnología', 'pch', 'https://shop.pchconnect.com/'],
    ['Steren', 'steren', 'https://www.steren.com.mx/'],
    ['Syscom', 'syscom', 'https://www.syscom.mx/']
  ];
  const OTROS = [
    ['ABSA', 'absa', 'https://www.grupoabsa.com/'],
    ['AltérCo', 'alterco', 'https://www.altercomx.com/'],
    ['Asta', 'asta', 'https://astamexico.com/'],
    ['Azerty', 'azerty', 'https://azerty.mx/inicio/'],
    ['Biotoner', 'biotoner', 'https://www.biotoner.com.mx/'],
    ['CDC Group', 'cdc-group', 'https://cdcgroup.mx/'],
    ['CompuSoluciones', 'compusoluciones', 'https://www.compusoluciones.com/'],
    ['CyberPuerta', 'cyberpuerta', 'https://www.cyberpuerta.mx/'],
    ['Daisytek', 'daisytek', 'https://www.daisytek.com.mx/'],
    ['DC Mayorista', 'dc-mayorista', 'https://dcm.com.mx/'],
    ['Dicotech', 'dicotech', 'https://www.dicotech.com.mx/'],
    ['G-Parts Refacciones', 'g-parts', 'https://www.gparts.com.mx/page/v2/public/index.php'],
    ['Grupo Dice', 'grupo-dice', 'https://grupo-dice.com/'],
    ['Intcomex', 'intcomex', 'https://store.intcomex.com/es-XMX/Home'],
    ['Lumen', 'lumen', 'https://lumen.com.mx/'],
    ['MAPS', 'maps', 'https://www.maps.com.mx/'],
    ['Maycom', 'maycom', 'https://maycom.mx/'],
    ['Myers', 'myers', 'https://www.casamyers.com.mx/'],
    ['Nexus', 'nexus', 'https://www.nexusarg.com/'],
    ['Nexsys', 'nexsys', 'https://nexsysla.com/mx/'],
    ['PacTech', 'pactech', 'https://pactechmayoreo.com.mx/'],
    ['Polyworks México', 'polyworks', 'https://www.polyworks.com/es-mx'],
    ['Relematic', 'relematic', 'https://relematic.mx/'],
    ['Distribuciones Samar', 'samar', 'https://www.samar.com.mx/'],
    ['SIASA', 'siasa', 'https://www.siasa.com/'],
    ['Tecnosinergia', 'tecnosinergia', 'https://tecnosinergia.com/'],
    ['Vyorsa', 'vyorsa', 'https://vyorsa.com.mx/'],
    ['Vifer', 'vifer', 'https://vifer.mx/'],
    ['330ohms', '330ohms', 'https://www.330ohms.com/']
  ];

  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function pintar(id, lista) {
    const ul = document.getElementById(id);
    if (!ul) return;
    ul.innerHTML = lista.map(([nombre, logo, url]) => {
      const img = `<img src="img/proveedores/${esc(logo)}.png" alt="${esc(nombre)}" loading="lazy">`;
      return /^https?:\/\//.test(url)
        ? `<li><a class="prov" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${img}</a></li>`
        : `<li><span class="prov">${img}</span></li>`;
    }).join('');
  }
  pintar('prov-destacados', DESTACADOS);
  pintar('prov-otros', OTROS);
})();
