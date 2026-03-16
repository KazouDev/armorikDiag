import Link from "next/link";
import Image from "next/image";

export default function MentionLegales() {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <Link href="/">
            <Image src="/assets/img/logo1.png" alt="Logo Armorik Diagnostics" width={150} height={50} style={{ objectFit: 'contain' }} />
          </Link>
        </div>
    
        <nav className="menu" aria-label="Menu principal">
          <ul>
            <li><Link href="/">ACCUEIL</Link></li>
            <li><Link href="/#diagnostics">NOS DIAGNOSTICS</Link></li>
            <li><Link href="/#devis">DEVIS</Link></li>
            <li><Link href="/#service">NOS SERVICES</Link></li>
          </ul>
        </nav>
    
        <div className="right">
          <Link href="/#contact" className="btn-contact">NOUS CONTACTER</Link>
        </div>
      </header>

      <main className="mentionLegales" style={{ backgroundColor: '#f5f5f5', padding: '10vh 10vw', minHeight: '80vh' }}>
        <h1 className="rose" style={{ paddingTop: 0 }}>Mentions légales</h1>

        <section style={{ fontSize: '1vw', color: '#1A1A1A', lineHeight: 1.8 }}>
          <h2 className="titreMention">Éditeur du site</h2>
          <p>
            Le site <strong>armorik-diagnostics.com</strong> est édité à titre personnel dans le cadre de l’activité de diagnostic immobilier exercée sous l’appellation <strong>Armorik Diagnostics</strong>.
          </p>
          <p>
            Responsable du site : <strong>Virginie Le Noa-Pellae</strong><br />
            Adresse : <strong>4 Route de Tréguier, 22700 Louannec</strong><br />
            Téléphone : <strong>02 96 13 27 79</strong><br />
            Email : <a href="mailto:contact@armorik-diagnostics.fr">contact@armorik-diagnostics.fr</a><br />
            Siret : 892 993 601 00012<br />
            TVA : FR 89 892 993 601<br />
          </p>

          <h2 className="titreMention">Statut de l’activité</h2>
          <p>
            L’activité de diagnostic immobilier est exercée à titre individuel.<br />
            Ce site est un site vitrine à usage informatif uniquement.<br />
            Aucune création de compte, espace personnel, ni fonctionnalité de modération n’est proposée.
          </p>

          <h2 className="titreMention">Hébergeur</h2>
          <p>
            Nom : <strong>OVH SAS</strong><br />
            Adresse : 2 rue Kellermann, 59100 Roubaix, France<br />
            Téléphone : 09 72 10 10 07<br />
            Site web : <a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">www.ovh.com</a>
          </p>

          <h2 className="titreMention">Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu du site <strong>armorik-diagnostics.com</strong> (textes, images, logo, graphismes, structure, etc.) est protégé par le droit de la propriété intellectuelle.
            Toute reproduction, diffusion ou utilisation sans autorisation écrite est interdite.
          </p>

          <h2 className="titreMention">Protection des données personnelles</h2>
          <p>
            Les informations recueillies via les formulaires de contact et de demande de devis (nom, téléphone, email, adresse) sont strictement limitées au traitement de votre demande.<br />
            Aucune donnée n’est utilisée à des fins commerciales ou transmises à des tiers.
          </p>
          <p>
            Conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.<br />
            Pour exercer ce droit, vous pouvez adresser un email à : <a href="mailto:armorik-diagnostics@gmail.com">armorik-diagnostics@gmail.com</a>.
          </p>

          <h2 className="titreMention">Cookies</h2>
          <p>
            Le site <strong>armorik-diagnostics.com</strong> n’utilise pas de cookies de suivi ou de mesure d’audience.
          </p>

          <h2 className="titreMention">Limitation de responsabilité</h2>
          <p>
            L’éditeur du site s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées.<br />
            Cependant, il ne peut être tenu responsable d’erreurs, d’omissions ou de tout dommage direct ou indirect lié à l’utilisation du site.
          </p>

          <h2 className="titreMention">Crédits</h2>
          <p>
            Design, développement, images et logos : <strong>Salomé Abiven</strong><br />
            Contact : <a href="mailto:abiven.salome@gmail.com">abiven.salome@gmail.com</a><br />
          </p>
        </section>
      </main>

      <footer id="contact">
        <div id="mention">
          <p>armorik-diagnostics.fr © Tous droit réservés - abiven.salome@gmail.com</p>
          <Link href="/mentionLegales">Mentions légales</Link>
        </div>
      </footer>
    </>
  );
}
