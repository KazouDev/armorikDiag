import Image from "next/image";

export default function Services() {
  return (
    <section id="service" aria-labelledby="service-title">
      <div id="certifs">
        <div>
          <Image src="/assets/img/lcp.png" alt="certification lcp" width={100} height={40} />
          <label>Organisme de certification</label>
        </div>
        <div>
          <Image src="/assets/img/klarity.jpg" alt="assurance klarity" width={100} height={40} />
          <label>Organisme d&apos;assurance</label>
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
  );
}
