"use client";

import { useToast } from "@/context/ToastProvider";
import { FormEvent, useEffect, useState } from "react";

export default function DevisForm() {
  const { showToast } = useToast();

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
    const values = Object.values(formData).slice(0, 4);
    const allFilled = values.every(val => val !== "");

    if (!allFilled) {
      if (showDevisForm) setShowDevisForm(false);
      if (activeDiags.length > 0) setActiveDiags([]);
      return;
    }

    if (!showDevisForm) setShowDevisForm(true);
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

  return (
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
                  <label htmlFor="delai_intervention" className="sr-only">Délai d&apos;intervention</label>
                  <select id="delai_intervention" name="delai_intervention" defaultValue="">
                    <option value="" disabled hidden>Délai d&apos;intervention</option>
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
  );
}
