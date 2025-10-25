1. Clone the repo
    git clone [REPO_URL]
    cd book-library-project

    putem face cate un branch separat pentru fiecare din noi, sau cum credeti, un branch pentru cate un feature, sau direct in main(all in), cum vreti.

2. Trimiteti-mi adresa de email ca sa va adaug pe firebase
3. Pt firebase, va trebuie npm si node instalat, dupa: npm install -g firebase-tools
4. firebase login(conectati la contul de gmail pe care il trimit pe grup)
5. firebase init

Dupa:
Select "Firestore"
Choose "Use an existing project"
Select: book-library-project-b336d
Set public directory: public
Configure as single-page app: No
Don't overwrite existing files



Dupa ce faceti modificari si vreti sa vedeti cum pusca tot 
    firebase deploy

dupa ce se face deploy vedeti ca daca schimbati ceva in firestore rules isi ia overwrite cu fisierul firestore.rules de aici
