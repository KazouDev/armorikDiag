"use client";
import { useToast } from "@/context/ToastProvider";
import Link from "next/link";
import { FormEvent } from "react";

export default function Footer() {
  const { showToast } = useToast();

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
          //form.reset();
        } else {
          showToast("Erreur lors de l'envoi", "error");
        }
      } catch {
        showToast("Impossible de contacter le serveur.", "error");
      }
    };
  return (
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
  );
}
