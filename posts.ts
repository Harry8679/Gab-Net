export interface Post {
    id: number;
    auteur: string;
    domaine: string;
    contenu: string;
}

const posts: Post[] = [
    { id: 1, auteur: "Awa", domaine: "devops", contenu: "Retour d'X sur Kubernates" },
    { id: 2, auteur: "Eric", domaine: "data", contenu: "Mon premier Pipeline Spark" }
];

export function listerPosts(): Post[] {
    return posts;
}

export function ajouterPost(donnees: {auteur: string; domaine: string; contenu: string;}) {
    const nouveauPost: Post = {
        id: posts.length,
        auteur: donnees.auteur,
        domaine: donnees.domaine,
        contenu: donnees.contenu
    };
    posts.push(nouveauPost);
    return nouveauPost;
}