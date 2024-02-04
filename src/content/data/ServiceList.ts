import Service from "../../class/Service.ts";

export const serviceList: Service[] = [
    new Service('Formations professionnelles', '/pricing-training', '<ul><li>Posture Managériale et Leadership</li>' +
        '<li>Cohésion et Communication</li>' +
        '<li>Developper ses Soft Skills</li></ul>', '/img/atelier-320x320.webp'),
    new Service('Séances d\'equicoaching individuelles', '/pricing-equicoaching', '<p>Séances d’environ 1h30. Disponible à la carte ou en forfait.' +
        '<br/>(En forfait : première séance par skype ou présentiel afin d’approfondir votre demande et d’élaborer un programme de séance adapté.)</p>', '/img/bourbon-320x320.webp'),
    new Service('Ateliers Découverte Equicoaching', '/events', '<p>Venez découvrir la puissance de l\'equicoaching lors d’une demie journée de découverte </p><p>– 6 pers max (Dates suivant organisation ou à la demande - 3 pers min)</p>', '/img/atelier-decouverte-320x320.webp'),
    new Service('Ateliers à thème Equicoaching', '/pricing-equicoaching', '<p>Venez travailler sur un thème donné lors d’une demi journée. </p><p>(Suivant organisation de 2 à 6 pers)</p>', '/img/atelier-decouverte-2-320x320.webp'),
    new Service('Cours d’équitation remise en confiance', '/pricing-equitation', '<p>Vous avez eu une mauvaise expérience avec un cheval (chute, accident…), depuis vous n’osez plus vivre votre passion comme avant ? Vous avez toujours voulu monter à cheval mais vous n’osez pas sauter le pas ? </p><p>Cours particuliers alliant technique équestre et techniques de coaching.</p>' +
        '<p><small>- en centre équestre uniquement -</small></p>', '/img/saut-320x320.webp'),
    new Service('Cours d’équitation gestion des émotions et préparation mentale', '/pricing-equitation', '<p>Le cheval ressent tout notre état émotionnel conscient et inconscient. Prendre conscience de soi pour mieux communiquer avec lui. </p><p>Pour du loisir ou pour la compétition. Cours particuliers ou collectifs (4 cavaliers max).</p>' +
        '<p><small>- en centre équestre uniquement -</small></p>', '/img/freedom-320x320.webp')
]