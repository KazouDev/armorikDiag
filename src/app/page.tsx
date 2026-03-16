"use client";

import { useState, useEffect, FormEvent, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const popupData: Record<string, Record<string, { icon: string, text: string }>> = {
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

export default function Home() {
  const [activeMenuId, setActiveMenuId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupActiveTab, setPopupActiveTab] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ msg: string; type: string } | null>(null);

  // Devis form state
  const [formData, setFormData] = useState({
    type_bien: "",
    type_transaction: "",
    type_energie: "",
    annee_construction: "",
    plus15ans: "oui"
  });

  const [activeDiags, setActiveDiags] = useState<string[]>([]);
  const [showDevisForm, setShowDevisForm] = useState(false);
  const [showLoiCarrez, setShowLoiCarrez] = useState(false);
  const [showLoiBoutin, setShowLoiBoutin] = useState(false);

  useEffect(() => {
    // Menu scroll observer
    const headerOffset = 80;
    const sections = Array.from(document.querySelectorAll("section[id], footer[id]"));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveMenuId(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: `-${headerOffset}px 0px -40% 0px`,
      threshold: 0.25
    });

    sections.forEach(s => observer.observe(s));
    
    const onScroll = () => {
      if (window.scrollY <= 100) {
        setActiveMenuId("");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      sections.forEach(s => observer.unobserve(s));
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    // Devis logic translated from script.js
    const values = Object.values(formData).slice(0, 4);
    const allFilled = values.every(val => val !== "");

    if (!allFilled) {
      setShowDevisForm(false);
      setActiveDiags([]);
      return;
    }

    setShowDevisForm(true);
    const { type_bien, type_transaction, type_energie, annee_construction, plus15ans } = formData;
    let newActiveDiags: string[] = [];

    if (type_transaction === "Vente") {
      if (type_bien === "Maison") {
        if (annee_construction.includes("Avant 1949")) newActiveDiags = ["dpe","electricité","erp","gaz","amiante","plomb"];
        else if (annee_construction.includes("1949 à 01/07/1997")) newActiveDiags = ["dpe","electricité","erp","gaz","amiante"];
        else newActiveDiags = ["dpe","electricité","erp","gaz"];
      } else {
        if (annee_construction.includes("Avant 1949")) newActiveDiags = ["dpe","electricité","erp","loi carrez","gaz","plomb"];
        else if (annee_construction.includes("1949 à 01/07/1997")) newActiveDiags = ["dpe","electricité","erp","loi carrez","gaz","amiante"];
        else newActiveDiags = ["dpe","electricité","erp","loi carrez","gaz"];
      }
      setShowLoiCarrez(true);
      setShowLoiBoutin(false);
      newActiveDiags.push("termite");
    } else if (type_transaction === "Location") {
      newActiveDiags = ["loi boutin","dpe","electricité","erp","gaz"];
      if (annee_construction.includes("Avant 1949")) newActiveDiags.push("plomb");
      setShowLoiCarrez(false);
      setShowLoiBoutin(true);
    } else {
      newActiveDiags = [];
      setShowLoiCarrez(false);
      setShowLoiBoutin(false);
    }

    const valueBool = plus15ans === "oui";
    if (type_energie === "Électricité" && !valueBool) {
      newActiveDiags = newActiveDiags.filter(d => d !== "electricité" && d !== "electricite"); // Just in case
    } else if (type_energie.includes("Gaz") && !valueBool) {
      newActiveDiags = newActiveDiags.filter(d => d !== "gaz");
    } else if (!type_energie.includes("Gaz") && type_energie !== "Électricité") {
      newActiveDiags = newActiveDiags.filter(d => d !== "gaz" && d !== "electricité");
    }

    setActiveDiags(newActiveDiags.map(d => d.toLowerCase()));
  }, [formData]);

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveMenuId("");
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveMenuId(id);
      }
    }
  };

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

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const onSubmitDevis = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const adresse = formData.get("adresse") + ", " + formData.get("code_postal") + " " + formData.get("ville");
    const requiredDiags = activeDiags.join(", ");

    const data = {
      from: formData.get("email"),
      subject: "Demande de devis",
      message: `- Nom: ${formData.get("nom")} \n - Email: ${formData.get("email")} \n - Tel: ${formData.get("telephone")} \n - Adresse: ${adresse} \n - Diagnostics requis: ${requiredDiags} \n - Délai: ${formData.get("delai_intervention")} \n - Surface: ${formData.get("surface_habitable")} \n - Message: ${formData.get("message_devis")}`
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
      });
      if (res.ok) {
        showToast("Message envoyé avec succès !");
        form.reset();
      } else {
        showToast("Erreur lors de l'envoi", "error");
      }
    } catch {
      showToast("Impossible de contacter le serveur.", "error");
    }
  };

  const onSubmitContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      from: formData.get("email"),
      subject: formData.get("sujet") || "Demande Armorik",
      message: `- Nom: ${formData.get("nom")} \n - Email: ${formData.get("email")} \n - Tel: ${formData.get("telephone")} \n - Message: ${formData.get("message")}`
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
      });
      if (res.ok) {
        showToast("Message envoyé avec succès !");
        form.reset();
      } else {
        showToast("Erreur lors de l'envoi", "error");
      }
    } catch {
      showToast("Impossible de contacter le serveur.", "error");
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="logo">
          <Link href="/" draggable="false" onClick={(e) => handleNavClick(e as any, "")}>
            <Image src="/assets/img/logo1.png" alt="Logo Armorik Diagnostics" width={150} height={50} style={{ objectFit: 'contain' }} draggable="false" priority />
          </Link>
        </div>

        <div className={`burger-menu ${menuOpen ? "open" : ""}`} id="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`menu ${menuOpen ? "open" : ""}`} id="nav-menu" aria-label="Menu principal">
          <ul>
            <li><a href="#" className={activeMenuId === "" ? "active" : ""} onClick={(e) => handleNavClick(e, "")}>ACCUEIL</a></li>
            <li><a href="#diagnostics" className={activeMenuId === "diagnostics" ? "active" : ""} onClick={(e) => handleNavClick(e, "diagnostics")}>NOS DIAGNOSTICS</a></li>
            <li><a href="#devis" className={activeMenuId === "devis" ? "active" : ""} onClick={(e) => handleNavClick(e, "devis")}>DEVIS</a></li>
            <li><a href="#service" className={activeMenuId === "service" ? "active" : ""} onClick={(e) => handleNavClick(e, "service")}>NOS SERVICES</a></li>
            <li className="mobile-only"><a href="#contact" className="btn-contact" onClick={(e) => handleNavClick(e, "contact")}>NOUS CONTACTER</a></li>
          </ul>
        </nav>

        <div className="right">
          <a href="#contact" className="btn-contact" onClick={(e) => handleNavClick(e, "contact")}>NOUS CONTACTER</a>
        </div>
      </header>    
      
      <main>
        <h1 className="seo-h1">
          Diagnostiqueur immobilier à Louannec, Lannion et tout le reste du Trégor
        </h1>

        <section className="hero" aria-labelledby="intro-title">
          <div className="hero-content">
            <Image src="/assets/img/logo3.png" width={800} height={200} alt="Logo Armorik Diagnostics" className="hero-logo" draggable="false" priority />
          </div>

          <div className="presentation">
            <div className="carreRose" aria-hidden="true"></div>
            <div className="presentation-container">
              <figure className="presentation-image">
                <Image src="/assets/img/imageAccueil.png" alt="Diagnostic immobilier" width={300} height={200} />
              </figure>
              <div className="presentation-text">
                <h2 className="titre">À vos côtés pour tous vos <span className="rose">diagnostics immobiliers</span></h2>
                <p>
                  Que vous vendez ou louez un bien immobilier, certains diagnostics immobiliers <br /> sont obligatoires.
                  Leur nature dépend de l’âge du bâtiment, de ses installations <br /> et du type de transaction.
                </p>
                <p>
                  <span className="rose">Armorik Diagnostics</span> vous accompagne avec réactivité et sérieux. <br />
                  Notre diagnostiqueuse certifiée réalise des expertises précises, indépendantes <br /> et conformes aux dernières réglementations,
                  afin de garantir la sécurité <br /> et la conformité de vos biens.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="ligneNoire1" aria-hidden="true" />

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
        
        <section id="devis" aria-labelledby="devis-title">
          <h2 id="devis-title" className="section">DEMANDE DE DEVIS</h2>
          <p className="intro-text">
            Merci de renseigner les champs ci-dessous pour connaître la liste des diagnostics techniques obligatoires.
          </p>

          <form id="formulaire1" onSubmit={onSubmitDevis}>
            <div className="grid">
              <div className="custom-select">
                <label htmlFor="type_bien" className="sr-only">Type de bien</label>
                <select id="type_bien" name="type_bien" value={formData.type_bien} onChange={(e) => setFormData({...formData, type_bien: e.target.value})} required>
                  <option value="" disabled hidden>Type de bien</option>
                  <option>Maison</option>
                  <option>Appartement</option>
                  <option>Local commercial</option>
                </select>
              </div>

              <div className="custom-select">
                <label htmlFor="type_transaction" className="sr-only">Type de transaction</label>
                <select id="type_transaction" name="type_transaction" value={formData.type_transaction} onChange={(e) => setFormData({...formData, type_transaction: e.target.value})} required>
                  <option value="" disabled hidden>Type de transaction</option>
                  <option>Vente</option>
                  <option>Location</option>
                </select>
              </div>

              <div className="custom-select">
                <label htmlFor="type_energie" className="sr-only">Type d'énergie</label>
                <select id="type_energie" name="type_energie" value={formData.type_energie} onChange={(e) => setFormData({...formData, type_energie: e.target.value})} required>
                  <option value="" disabled hidden>Type d'énergie</option>
                  <option>Électricité</option>
                  <option>Gaz de ville</option>
                  <option>Gaz citerne</option>
                  <option>Fioul</option>
                  <option>Bois / Granulés</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="custom-select">
                <label htmlFor="annee_construction" className="sr-only">Année de construction</label>
                <select id="annee_construction" name="annee_construction" value={formData.annee_construction} onChange={(e) => setFormData({...formData, annee_construction: e.target.value})} required>
                  <option value="" disabled hidden>Année de construction</option>
                  <option>Avant 1949</option>
                  <option>De 1949 à 01/07/1997</option>
                  <option>Après 01/07/1997</option>
                </select>
              </div>

              {(["Électricité","Gaz de ville","Gaz citerne"].includes(formData.type_energie)) && (
                <>
                  <div id="plus15ansDivLabel">
                    <label>Le logement a-t-il plus de 15 ans ?</label>
                  </div>
                  <div id="plus15ansDiv">
                    <label><input type="radio" name="plus15ans" id="Oui" value="oui" checked={formData.plus15ans === "oui"} onChange={() => setFormData({...formData, plus15ans: "oui"})} /> Oui</label>
                    <label><input type="radio" name="plus15ans" id="btnNon" value="non" checked={formData.plus15ans === "non"} onChange={() => setFormData({...formData, plus15ans: "non"})} /> Non</label>
                  </div>
                </>
              )}
            </div>

            {showDevisForm && (
              <div className="devisDivCachee">
                <section id="diagObl">
                  <h3>Diagnostics obligatoires</h3>
                  <div className="diag-grid">
                    <p className={`diag_obligatoire ${activeDiags.includes("plomb") ? "active":""}`}>Plomb</p>
                    <p className={`diag_obligatoire ${activeDiags.includes("amiante") ? "active":""}`}>Amiante</p>
                    <p className={`diag_obligatoire ${activeDiags.includes("termite") ? "active":""}`}>Termite</p>
                    <p className={`diag_obligatoire ${activeDiags.includes("dpe") ? "active":""}`}>DPE</p>
                    <p className={`diag_obligatoire gaz ${activeDiags.includes("gaz") ? "active":""}`}>Gaz</p>
                    <p className={`diag_obligatoire elect ${activeDiags.includes("electricité") ? "active":""}`}>Electricité</p>
                    {showLoiCarrez && <p className={`diag_obligatoire loi-carrez ${activeDiags.includes("loi carrez") ? "active":""}`}>Loi Carrez</p>}
                    {showLoiBoutin && <p className={`diag_obligatoire loi-boutin ${activeDiags.includes("loi boutin") ? "active":""}`}>Loi Boutin</p>}
                    <p className={`diag_obligatoire ${activeDiags.includes("erp") ? "active":""}`}>ERP</p>
                  </div>
                </section>

                <section id="coordonnees_devis">
                  <h3>Demandez un devis</h3>
                  <div className="coord-grid">
                    <div className="custom-select">
                      <label htmlFor="delai_intervention" className="sr-only">Délai d’intervention</label>
                      <select id="delai_intervention" name="delai_intervention" defaultValue="">
                        <option value="" disabled hidden>Délai d’intervention</option>
                        <option>Dès que possible</option>
                        <option>Sous 48h</option>
                        <option>Sous 7 jours</option>
                        <option>Flexible (selon vos disponibilités)</option>
                      </select>
                    </div>

                    <div className="custom-select">
                      <label htmlFor="surface_habitable" className="sr-only">Surface habitable (m²)</label>
                      <select id="surface_habitable" name="surface_habitable" defaultValue="">
                        <option value="" disabled hidden>Surface habitable (m²)</option>
                        <option>Moins de 30 m²</option>
                        <option>30 à 50 m²</option>
                        <option>51 à 100 m²</option>
                        <option>101 à 150 m²</option>
                        <option>Plus de 150 m²</option>
                      </select>
                    </div>

                    <label htmlFor="nom" className="sr-only">Nom*</label>
                    <input type="text" id="nom" name="nom" placeholder="Nom*" required />

                    <label htmlFor="adresse" className="sr-only">Adresse*</label>
                    <input type="text" id="adresse" name="adresse" placeholder="Adresse*" required />

                    <label htmlFor="telephone" className="sr-only">Téléphone*</label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Téléphone*" required />

                    <label htmlFor="code_postal" className="sr-only">Code postal*</label>
                    <input type="text" id="code_postal" name="code_postal" placeholder="Code postal*" required />

                    <label htmlFor="email" className="sr-only">Email*</label>
                    <input type="email" id="email" name="email" placeholder="Email*" required />

                    <label htmlFor="ville" className="sr-only">Ville*</label>
                    <input type="text" id="ville" name="ville" placeholder="Ville*" required />

                    <label htmlFor="message_devis" className="sr-only">Informations complémentaires</label>
                    <textarea id="message_devis" name="message_devis" placeholder="Informations complémentaires, message, commentaires..." rows={5}></textarea>
                  </div>
                </section>

                <div id="button1_form">
                  <button type="submit">ENVOYER</button>
                </div>
              </div>
            )}
          </form>
        </section>

        <hr className="ligneNoire2" aria-hidden="true" />

        <section id="service" aria-labelledby="service-title">
          <div id="certifs">
            <div>
              <Image src="/assets/img/lcp.png" alt="certification lcp" width={100} height={40} />
              <label>Organisme de certification</label>
            </div>
            <div>
              <Image src="/assets/img/klarity.jpg" alt="assurance klarity" width={100} height={40} />
              <label>Organisme d'assurance</label>
            </div>
          </div>

          <div id="fondService">
            <h2 className="section" style={{ paddingBottom: '5vh' }}>NOS SERVICES</h2>
            <div id="textService">
              <Image src="/assets/img/agence.jpeg" alt="Image de l'agence Armorik Diagnostics" width={300} height={200} />
              <div>
                <p>
                  Basé à Louannec, le cabinet <span className="rose">Armorik Diagnostics</span> doit sa réactivité et son efficacité grâce au dynamisme de ses collaborateurs qualifiés, capables de fournir rapidement des diagnostics techniques complets.
                </p> 
                <p>
                  Notre activité concerne la réalisation de contrôles visuels, de mesures et d&apos;essais pour vérifier l&apos;état des installations intérieures du logement. La rédaction d&apos;un rapport de diagnostic permet d&apos;émettre des recommandations aux propriétaires/occupants, afin de leur garantir une sécurité optimale.
                </p>
                <p>Nous intervenons sur <span className="rose">tout le Trégor</span>.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <h2 className="section rose">NOUS CONTACTER</h2>

        <section id="coordonnees">
          <article className="coord">
            <span className="imgCoord rose"><i className="fas fa-map-marker-alt"></i></span>
            <h3 className="title-footer">Adresse</h3>
            <address className="coord-footer" style={{ fontSize: '20px' }}>4 Route de Tréguier, 22700 Louannec</address>
          </article>
          <span className="separateurs"></span>
          <article className="coord">
            <span className="imgCoord rose"><i className="fas fa-phone"></i></span>
            <h3 className="title-footer">Téléphone</h3>
            <p className="coord-footer" style={{ fontSize: '20px' }}>02 96 13 27 79</p>
          </article>
          <span className="separateurs"></span>
          <article className="coord">
            <span className="imgCoord rose"><i className="fas fa-envelope"></i></span>
            <h3 className="title-footer">Email</h3>
            <p className="coord-footer" style={{ fontSize: '20px' }}><a href="mailto:contact@armorik-diagnostics.fr">contact@armorik-diagnostics.fr</a></p>
          </article>
        </section>

        <section id="formulaire2">
          <h3>POUR TOUTES QUESTIONS, <br /> VOUS POUVEZ NOUS CONTACTER VIA LE FORMULAIRE CI-DESSOUS</h3>
          <form id="contactForm" onSubmit={onSubmitContact}>
            <label htmlFor="nom" className="sr-only">Nom*</label>
            <input type="text" id="nom-contact" name="nom" placeholder="Nom*" required />

            <label htmlFor="telephone" className="sr-only">Téléphone*</label>
            <input type="tel" id="telephone-contact" name="telephone" placeholder="Téléphone*" required />

            <label htmlFor="email" className="sr-only">Email*</label>
            <input type="email" id="email-contact" name="email" placeholder="Email*" required />

            <label htmlFor="sujet" className="sr-only">Sujet</label>
            <input type="text" id="sujet-contact" name="sujet" placeholder="Sujet" />

            <label htmlFor="message" className="sr-only">Message*</label>
            <textarea id="message-contact" name="message" placeholder="Message*" rows={5} required></textarea>

            <button type="submit">Envoyer</button>
          </form>
        </section>

        <div id="mention">
          <p>armorik-diagnostics.fr © Tous droit réservés - abiven.salome@gmail.com</p>
          <Link href="/mentionLegales">Mentions légales</Link>
        </div>
      </footer>  

      {toastMessage && (
        <div id="toast-container">
          <div className={`toast ${toastMessage.type}`}>
            {toastMessage.msg}
          </div>
        </div>
      )}
    </>
  );
}
