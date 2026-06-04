import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { ajouterPost, listerPosts, type Post } from "./posts.js";



// createServer cree le server. La fonction qu'on lui passe entre parentheses
// est rappelee AUTOMATIQUEMENT chaque fois qu'un visiteur fait la requete
// - req (request) = ce que le visiteur demande (quelle methode, quelle adresse)
// - res (response) = ce qu'on va lui RENVOYER (c'est nous qui le construisons)
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // 1 er cas : LIRE le fil (GET = donne moi quelque chose)
    // On examine la demande : est-ce une requete GET (= "donne-moi quelque chose")
    // ET vise-t-elle l'adresse /feed ? Les deux conditions doivent etre vraies
    if (req.method === "GET" && req.url === "/feed") {
        // On prepare l'entete de la reponse :
        // - 200 = code "tout va bien"
        // - on previent le navigateur qu'on lui envoie du JSON
        res.writeHead(200, {"Content-Type": "application/json"});
        // JSON.stringify transforme notre tableau JS 'posts' en texte (du JSON),
        // puis res.end ENVOIE ce texte et TERMINE la reponse
        res.end(JSON.stringify(listerPosts));
        // return : on s'arrete la. Sans lui le code continuerai plus bas et 
        // essaierait d'envoyer une deuxieme reponse ce qui ferait planter le serveur
        return;
    }

    // 2e cas : PUBLIER un post (POST = voici quelque chose a creer)
    if (req.method === "POST" && req.url === "/posts") {
        // une feuille vide pour recoller la lettre
        let corps = "";
        // a chaque page recu on colle a la suite
        req.on("data", (morceau) => { corps += morceau });
        // Quand le visiteur a fini, on lit le tout
        req.on("end", () => {
            try {
                const donnees = JSON.parse(corps);
                const nouveauPost: Post = ajouterPost(donnees);
                posts.push(nouveauPost);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(nouveauPost));
            } catch {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ erreur: "JSON invalide" }));
            }
        });
        return;
    }

    // On arrive ici que si le if est faux
    // On envoie alors une erreur 404 = page non trouvee
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({ erreur: "route inconnue" }));
});

server.listen(3300, () => {
    console.log("Server started on http://localhost:3300");
});