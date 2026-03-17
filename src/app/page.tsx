import DevisForm from "@/components/home/DevisForm";
import Diagnostics from "@/components/home/Diagnostics";
import Image from 'next/image';

export default function Home() {
  return (
    <>
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

        <Diagnostics />
        
        <DevisForm />

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
    </>
  );
}

