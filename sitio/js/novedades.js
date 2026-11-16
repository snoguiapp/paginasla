/* Panel "Nuevos productos de nuestras marcas" (portada).
   Cada producto es un bloque { ... }. Solo nombre y características, sin precios.
   - marca:           Dell, HP, Lenovo, Epson, Intel...
   - nombre:          nombre del producto
   - caracteristicas: 2 o 3 frases cortas tomadas de la página oficial del fabricante
   - imagen:          archivo en img/destacados/ (16:10, .webp). Si falta, se ve un fondo azul.
   - enlace:          página OFICIAL del producto (se abre en pestaña nueva)
   Usa imágenes oficiales del fabricante (portal de partners). Para agregar un producto, copia un bloque,
   pégalo después de una coma y cambia los datos. Para quitarlo, borra su bloque completo. */
window.NOVEDADES = [
  {
    marca: 'Dell',
    nombre: 'Dell Pro 7',
    caracteristicas: [
      'Laptops y 2 en 1 de 13 y 14 pulgadas',
      'Según Dell, las más delgadas de su clase en equipos comerciales',
      'Hasta 18% más delgadas que la generación anterior'
    ],
    imagen: 'img/destacados/dell-pro-7.webp',
    enlace: 'https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~03~dell-reimagines-commercial-pcs-with-new-sleek-and-powerful-designs.htm'
  },
  {
    marca: 'Dell',
    nombre: 'Dell Pro Precision 5 y 7',
    caracteristicas: [
      'Estaciones de trabajo móviles de 14 y 16 pulgadas',
      'Procesadores Intel Core Ultra Serie 3',
      'Gráficos NVIDIA RTX PRO Blackwell para laptop'
    ],
    imagen: 'img/destacados/dell-pro-precision-5-7.webp',
    enlace: 'https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~03~dell-reimagines-commercial-pcs-with-new-sleek-and-powerful-designs.htm'
  },
  {
    marca: 'Dell',
    nombre: 'Dell Pro Precision 9',
    caracteristicas: [
      'Torres de trabajo T2, T4 y T6',
      'Procesadores Intel Xeon serie 600, hasta 86 núcleos',
      'Gráficos NVIDIA RTX PRO Blackwell'
    ],
    imagen: 'img/destacados/dell-pro-precision-9.webp',
    enlace: 'https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~03~dell-reimagines-commercial-pcs-with-new-sleek-and-powerful-designs.htm'
  },
  {
    marca: 'Dell',
    nombre: 'Dell Pro 5 Micro y monitores Dell Pro P',
    caracteristicas: [
      'Escritorio ultracompacto con rendimiento de torre',
      'Monitores con funciones de conferencia',
      'Teclados y mouse nuevos'
    ],
    imagen: 'img/destacados/dell-pro-5-micro.webp',
    enlace: 'https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~03~dell-reimagines-commercial-pcs-with-new-sleek-and-powerful-designs.htm'
  }
  // Ejemplo para otra marca. Quita los // del inicio de cada línea, cambia los datos
  // y deja una coma después del bloque anterior:
  //
  // ,{
  //   marca: 'HP',
  //   nombre: 'Nombre del producto',
  //   caracteristicas: ['Característica 1', 'Característica 2', 'Característica 3'],
  //   imagen: 'img/destacados/nombre-del-producto.webp',
  //   enlace: 'https://www.hp.com/mx-es/...'
  // }
];
