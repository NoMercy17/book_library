1. Clone the repo
    git clone [REPO_URL]
    cd book-library-project

    putem face cate un branch separat pentru fiecare din noi, sau cum credeti, un branch pentru cate un feature, sau direct in main(all in), cum vreti.

2. Trimiteti-mi adresa de email ca sa va adaug pe firebase
3. Creati .env pentru informatiile de la app si le trimit alea pe grup ca sa le introduceti
4. Pt firebase, va trebuie npm si node instalat, dupa: npm install -g firebase-tools
5. firebase login(conectati la contul de gmail pe care il trimit pe grup)
6. firebase init

Dupa:
Select "Firestore"
Choose "Use an existing project"
Select: book-library-project-b336d
Set public directory: public
Configure as single-page app: No
Don't overwrite existing files



Dupa ce faceti modificari si vreti sa vedeti cum pusca tot 
    firebase deploy
sau

    firebase deploy --only hosting

dupa ce se face deploy vedeti ca daca schimbati ceva in firestore rules isi ia overwrite cu fisierul firestore.rules de aici
