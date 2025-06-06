# UNDER REFACTORING. 

# 📚 ShelfSpost

Search4YourBook è un'applicazione web che consuma l'API esterna di **OpenAILibrary** per mostrare un elenco di libri in base al genere selezionato dall'utente. L'app è sviluppata con **React**, **TypeScript** e **Tailwind CSS v4**.

---

## 🚀 Funzionalità
- Ricerca libri in base al genere
- Visualizzazione dell'elenco di libri corrispondenti
- Pagina dei dettagli di un libro con descrizione e altre informazioni

---

## 🛠️ Tecnologie utilizzate
- ⚛️ **React** - Libreria per costruire l'interfaccia utente
- 🏗️ **React Router v7** - Gestione della navigazione tra le pagine
- 🎨 **Tailwind CSS** - Stile moderno e responsive
- 🌍 **OpenAILibrary API** - Fonte dei dati sui libri

---

## 📦 Installazione e Avvio
1. **Clonare il repository**
   ```sh
   git clone https://github.com/tuo-username/Search4YourBook.git
   cd Search4YourBook
   ```
2. **Installare le dipendenze**
   ```sh
   npm install
   ```
3. **Avviare il server di sviluppo**
   ```sh
   npm run dev
   ```
4. Aprire il browser su `http://localhost:5173/` (se usi Vite) oppure `http://localhost:3000/` (se usi CRA)

---

## 🔄 Comandi Git Utili
Ecco alcuni comandi Git utili per gestire il progetto:

- **Inizializzare un repository Git (se non è già stato fatto)**
  ```sh
  git init
  ```
- **Aggiungere tutti i file al commit**
  ```sh
  git add .
  ```
- **Creare un commit con un messaggio**
  ```sh
  git commit -m "Messaggio del commit"
  ```
- **Inviare le modifiche al repository remoto**
  ```sh
  git push origin main
  ```
- **Aggiornare il progetto con le ultime modifiche dal repository remoto**
  ```sh
  git pull origin main
  ```
  
## 📖 API Utilizzata
L'app si connette all'API **OpenAILibrary**, che fornisce dati sui libri in formato JSON.

Esempio di richiesta:
```sh
GET https://api.openailibrary.com/books?genre=Fantasy
```
Esempio di risposta:
```json
[
  {
    "id": 1,
    "title": "Il Signore degli Anelli",
    "author": "J.R.R. Tolkien",
    "description": "Un'epica storia fantasy..."
  }
]
```

---

## 🔧 Struttura del Progetto
```
Search4YourBook/
│── src/
│   ├── components/   # Componenti UI
│   ├── pages/        # Pagine dell'app
│   ├── routes/       # Configurazione delle rotte
│   ├── styles/       # File CSS (Tailwind)
│   ├── App.jsx       # Componente principale
│   ├── main.jsx      # Punto di ingresso
│── public/
│── package.json
│── README.md
```

---

## 🛠️ Possibili Miglioramenti
- Aggiungere un sistema di **paginazione**
- Implementare un **sistema di preferiti** per salvare libri
- Integrare una funzione di **autocompletamento** nella ricerca

---

## 📝 Licenza
Questo progetto è rilasciato sotto la licenza MIT.

---

## 👨‍💻 Autore
**Il tuo nome o username GitHub**
- GitHub: [@tuo-username](https://github.com/EliaGiolli)
- LinkedIn: [Il tuo profilo](https://www.linkedin.com/in/eliagiolli/)

