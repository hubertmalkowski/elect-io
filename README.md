# elect-io

Witajcie moi kochani, to jest nasze kochane repo. Kilka zasad: rozdzielamy componenty tak jak tylko sie da. Tykacie router/index.js tylko jak wiecie co robicie. Rozdzielamy css'a jak tylko sie da. Wszystkie commity pięknie opisujemy, a pod spodem opis jak wgl to odpalić.

## Struktura projektu
Wszystkie pliki znajdują się w ```./src```. Dam opis folderów i co się w nich znajduje

### ```./Assets```
W assets mamy css praktycznie tylko

### ```./components```
W components mamy komponenty wszystkie i testy do tych komponentów

### ```./layouts```
Tutaj mamy części widoków, które nie będą zarządzane przez router. Możecie spojrzeć w ```App.vue``` to zobaczycie w jaki sposób są użyte. Znajduje się w nich np nawigacja.

### ```./router```
Router to jest rzecz, która zarządza paskiem adresu i jakie rzeczy powinno wyświetlać w jakim momencie. Tu macie dokumentacje https://router.vuejs.org/

### ```./stores```
Tam przechowujemy stany globalne takie jak np informacje o użytkowniku. Story są zrobione z użyciem biblioteki pinia https://pinia.vuejs.org/

### ```./types```
Tutaj przechowuję typy zmiennych dla typescripta, np typ danych z userem itp

### ```./views```
Tutaj są widoki wszystkie, które używa router

### ```App.vue```
to jest coś w stylu funkcji main w javie, to jest widok wyświetlany cały czas przez przeglądarke. W środku jest ```<router-view/>```.

### ```Main.ts```

To jest plik inicjujący całe vue i shoelace. Tam raczej nie macie co tykać.







## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```


