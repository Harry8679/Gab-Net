import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

interface Post {
    id: number;
    auteur: string;
    domaine: string;
    contenu: string;
}

const posts: Post[] = [
    { id: 1, auteur: "Awa", domaine: "devops", contenu: "Retour d'X sur Kubernates" },
    { id: 2, auteur: "Eric", domaine: "data", contenu: "Mon premier Pipeline Spark" }
];

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/feed") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(posts));
        return;
    }

    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({ erreur: "route inconnue" }));
});