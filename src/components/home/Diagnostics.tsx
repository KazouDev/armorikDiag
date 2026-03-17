"use client";

import { MouseEvent as ReactMouseEvent, useState } from "react";

const popupData: Record<string, Record<string, { icon: string; text: string }>> = {
  "Diagnostics techniques": {
    "Électricité": {
      icon: "fa-bolt",
      text: "Le diagnostic électricité est <strong>obligatoire</strong> lors de la vente ou de la mise en location d'un bien immobilier dont l'installation électrique date de plus de 15 ans. Celui-ci est valable <strong>3 ans pour une vente</strong> et <strong>6 ans pour une location</strong>.<br><br>Il vise à identifier les défauts susceptibles de porter atteinte à la sécurité des personnes. Ce contrôle permet de détecter les anomalies, les risques de <strong>court-circuit</strong> ou d'<strong>électrocution</strong>, et garantit la sécurité des occupants.<br><br>Depuis 2018, ce diagnostic est <strong>opposable juridiquement</strong>, ce qui signifie que les informations qu'il contient peuvent être utilisées en cas de litige."
    },
    "Gaz": {
      icon: "fa-fire-flame-simple",
      text: "Le diagnostic gaz est <strong>requis</strong> lors de la vente ou de la mise en location d'un bien immobilier dont l'installation intérieure de gaz date de plus de 15 ans. Celui-ci est valable <strong>3 ans pour une vente</strong> et <strong>6 ans pour une location</strong>.<br><br>Il a pour but de déceler les risques éventuels des appareils et/ou de l'installation intérieure de gaz pour la <strong>santé</strong> et la <strong>sécurité</strong> des occupants.<br><br>Ce contrôle permet de détecter les <strong>fuites</strong>, les installations <strong>défectueuses</strong> et les risques potentiels pour prévenir tout accident domestique."
    },
    "Plomb": {
      icon: "fa-droplet",
      text: "Le diagnostic plomb, ou <strong>Constat de Risque d'Exposition au Plomb (CREP)</strong>, est <strong>obligatoire</strong> lors de la vente d'un bien immobilier construit avant le <strong>1er janvier 1949</strong>. En cas de rapport positif, il est valable <strong>1 an pour une vente</strong> et <strong>6 ans pour une location</strong>. Il est <strong>illimité</strong> en cas d'absence de plomb.<br><br>Il permet de mesurer la quantité de plomb dans les revêtements (peintures, papiers peints, etc.) à l'aide d'un appareil à <strong>fluorescence X</strong>.<br><br>Si la présence de plomb est détectée, des recommandations sont faites pour limiter les <strong>risques d'exposition</strong>, notamment en cas de dégradation des revêtements."
    },
    "Amiante": {
      icon: "fa-house-chimney-crack",
      text: "Le diagnostic amiante est <strong>nécessaire</strong> lors de toute vente d'un bien immobilier construit avant le <strong>1er juillet 1997</strong>, date d'interdiction totale de l'emploi de l'amiante. En cas de rapport positif, il est valable <strong>3 ans</strong>. Il est <strong>illimité</strong> en cas d'absence d'amiante.<br><br>L'amiante, avant son interdiction, a souvent été utilisée dans la construction, notamment dans les bâtiments à usage d'habitation. Cependant, ce matériau s'est avéré être <strong>très dangereux pour la santé</strong> car ses particules peuvent provoquer des troubles graves dans l'organisme.<br><br>Ce diagnostic permet de détecter la présence d'amiante et d'informer l'acquéreur sur les risques associés."
    },
    "Termites": {
      icon: "fa-bug",
      text: "Le <strong>diagnostic termites</strong> est <strong>obligatoire</strong> lors de la vente d’un bien situé dans une <strong>zone à risque</strong> définie par arrêté préfectoral.<br><br>Dans notre région, le diagnostiqueur réalise un <strong>\"Etat Parasitaire\"</strong> obligatoire pour toutes ventes. Ce rapport doit dater de <strong>moins de six mois</strong> au moment de la signature de l'acte authentique chez le notaire.<br><br>Le diagnostiqueur immobilier n’effectue pas de recherche destructive. Il utilise différentes techniques qui permettent de mettre en évidence la présence d'insectes (<strong>vrillettes, petites vrillettes, capricornes…</strong>) et de champignons (<strong>pourriture molle, pourriture fibreuse, mérule</strong>)."
    }
  },

  "Diagnostics énergétiques": {
    "DPE": {
      icon: "fa-leaf",
      text: "Le Diagnostic de Performance Énergétique (DPE) évalue la <strong>consommation énergétique</strong> d'un logement et son <strong>impact environnemental</strong>. Il attribue une note allant de <strong>A (très performant)</strong> à <strong>G (très énergivore)</strong>.<br><br>Ce diagnostic est <strong>obligatoire</strong> lors de la vente ou de la location d'un bien immobilier et est valable <strong>10 ans</strong>.<br><br>Il informe le futur occupant sur les <strong>coûts énergétiques potentiels</strong> et les <strong>émissions de gaz à effet de serre</strong> associées.<br><br>Depuis 2021, le DPE est <strong>opposable juridiquement</strong>."
    },
    "Audit énergétique": {
      icon: "fa-chart-line",
      text: "L'audit énergétique propose une <strong>analyse détaillée</strong> de la consommation énergétique du bâtiment et des solutions pour l'améliorer. Il inclut des recommandations sur l'<strong>isolation</strong>, le <strong>chauffage</strong>, la <strong>ventilation</strong> et l'<strong>éclairage</strong> afin de réduire les coûts et l'impact environnemental.<br><br>Il a pour but d'<strong>optimiser la performance énergétique</strong> du logement et de réaliser des économies sur le long terme.<br><br>En cas de vente, l'audit est <strong>obligatoire pour les bâtiments classés E, F ou G</strong>. À partir du <strong>1er janvier 2034</strong>, il concernera les bâtiments classés <strong>D</strong>. L'audit est <strong>valable 5 ans</strong>."
    }
  },

  "Surfaces et Environnement": {
    "Loi Carrez": {
      icon: "fa-scroll",
      text: "La Loi Carrez est une réglementation française qui impose la mention de la <strong>superficie privative</strong> d'un bien immobilier lors de sa vente, spécifiquement pour les lots en copropriété.<br><br>Elle s'applique aux appartements, maisons en copropriété, caves, greniers, remises et autres espaces privatifs.<br><br>La superficie est mesurée à l'intérieur des murs, en excluant les <strong>cloisons</strong>, <strong>embrasures</strong> de portes et fenêtres, <strong>escaliers</strong> et autres éléments non habitables.<br><br>Cette mesure vise à <strong>protéger l'acheteur</strong> en lui fournissant une information précise sur la surface réelle du bien acquis."
    },
    "Loi Boutin": {
      icon: "fa-scroll",
      text: "La Loi Boutin concerne la mesure de la <strong>surface habitable</strong> d'un logement, principalement dans le cadre des locations.<br><br>Elle exclut les surfaces occupées par les <strong>murs</strong>, <strong>cloisons</strong>, <strong>escaliers</strong>, <strong>embrasures de portes et fenêtres</strong>, ainsi que les <strong>parties communes</strong>.<br><br>Seules les <strong>pièces principales</strong> (chambres, salons, cuisines) sont prises en compte.<br><br>Cette loi vise à garantir aux locataires une <strong>information transparente</strong> sur la surface réellement utilisable du logement qu'ils occupent."
    },
    "ERP": {
      icon: "fa-triangle-exclamation",
      text: "L'État des Risques et Pollutions (ERP) informe sur les <strong>risques naturels, miniers, technologiques, sismiques et de pollution des sols</strong> auxquels le bien immobilier peut être exposé.<br><br>Il est <strong>obligatoire</strong> lors de la vente ou de la location d'un bien immobilier et est valable <strong>6 mois</strong>.<br><br>Ce diagnostic permet à l'acquéreur ou au locataire d'avoir une <strong>connaissance complète</strong> du contexte environnemental du logement et de prendre des décisions éclairées."
    }
  }
};

export default function Diagnostics() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupActiveTab, setPopupActiveTab] = useState("");

  const openPopup = (title: string, e: ReactMouseEvent) => {
    e.preventDefault();
    setPopupTitle(title);
    const diags = popupData[title];
    if (diags) {
      setPopupActiveTab(Object.keys(diags)[0]);
    }
    setPopupOpen(true);
    document.body.classList.add("noscroll");
  };

  const closePopup = () => {
    setPopupOpen(false);
    document.body.classList.remove("noscroll");
  };

  return (
    <>
      <section id="diagnostics" aria-labelledby="diag-title">
        <h2 id="diag-title" className="section">NOS DIAGNOSTICS</h2>
        <div id="sectionDiag">
          <div className="diag">
            <p className="rose">Diagnostics techniques</p>
            <ul>
              <li>Électricité</li>
              <li>Gaz</li>
              <li>Plomb</li>
              <li>Amiante</li>
              <li>Termites</li>
            </ul>
            <a href="#" className="savoirPlus" onClick={(e) => openPopup("Diagnostics techniques", e)}>en savoir plus</a>
          </div>
          <div className="diag">
            <p className="rose">Diagnostics énergétiques</p>
            <ul>
              <li>DPE</li>
              <li>Audit énergétique</li>
            </ul>
            <a href="#" className="savoirPlus" onClick={(e) => openPopup("Diagnostics énergétiques", e)}>en savoir plus</a>
          </div>
          <div className="diag">
            <p className="rose">Surfaces et Environnement</p>
            <ul>
              <li>Loi Carrez</li>
              <li>Loi Boutin</li>
              <li>ERP</li>
            </ul>
            <a href="#" className="savoirPlus" onClick={(e) => openPopup("Surfaces et Environnement", e)}>en savoir plus</a>
          </div>
        </div>
      </section>

      {popupOpen && (
        <aside id="popup-overlay" className="overlay" style={{ display: 'flex' }} role="dialog" aria-modal="true">
          <div className="popup">
            <span className="close-btn" aria-label="Fermer la fenêtre" onClick={closePopup}>&times;</span>
            <div className="popup-content">
              <h2 id="popup-title">{popupTitle}</h2>
              <div className="diagnostic-options">
                {popupData[popupTitle] && Object.entries(popupData[popupTitle]).map(([key, item]) => (
                  <div 
                    key={key} 
                    className={`diagnostic-btn ${popupActiveTab === key ? "active" : ""}`}
                    onClick={() => setPopupActiveTab(key)}
                  >
                    <i className={`icon-diag fa ${item.icon} fa-2x`}></i>
                    <span>{key}</span>
                  </div>
                ))}
              </div>
              <div className="diagnostic-text" id="popup-text">
                  {popupActiveTab && popupData[popupTitle]?.[popupActiveTab] && (
                    <>
                      <h3 className="rose">{popupActiveTab}</h3>
                      <p dangerouslySetInnerHTML={{ __html: popupData[popupTitle][popupActiveTab].text }}></p>
                    </>
                  )}
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
