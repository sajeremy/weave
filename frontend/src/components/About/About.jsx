import "./About.scss";

const AboutPage = () => {
  return (
    <div className="about">
      <div className="about-container">
        <div className="developer-container">
          <img
            className="about-img"
            src={require("../../assets/bonnie.jpeg")}
            alt="Camera Shy"
          ></img>
          <div className="developer-container-middle">
            <h2 className="about-name"> Bonnie Li</h2>
            <div className="social-container">
              <a className="social-media-links">
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a
                className="social-media-links"
                href="https://github.com/bonnieli51"
                target="_blank"
              >
                <i class="fa-brands fa-square-github"></i>
              </a>
            </div>
            <p className="about-description">Flex Developer</p>
          </div>
          
        </div>
        <div className="developer-container">
          <img
            className="about-img"
            src={require("../../assets/gleb.jpeg")}
            alt="Camera Shy"
          ></img>
          <div className="developer-container-middle">
            <h2 className="about-name"> Gleb Mirzayev </h2>
            <div className="social-container">
              <a
                className="social-media-links"
                href="https://www.linkedin.com/in/gleb-mirzayev-63990a86/"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a
                className="social-media-links"
                href="https://github.com/gmirzayev"
                target="_blank"
              >
                <i class="fa-brands fa-square-github"></i>
              </a>
            </div>
          </div>
          <p className="about-description">Frontend Lead</p>
        </div>

        <div className="developer-container">
          <img
            className="about-img"
            src={require("../../assets/jeremy.png")}
            alt="Camera Shy"
          ></img>
          <div className="developer-container-middle">
            <div>
              <h2 className="about-name"> Jeremy Santiago </h2>
            </div>
            <div className="social-container">
              <a
                className="social-media-links"
                href="https://www.linkedin.com/in/jeremy-santiago-11b05367"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a
                className="social-media-links"
                href="https://github.com/sajeremy"
                target="_blank"
              >
                <i class="fa-brands fa-square-github"></i>
              </a>
            </div>
          </div>
          <p className="about-description">Backend Lead</p>
        </div>

        <div className="developer-container">
          <img
            className="about-img"
            src={require("../../assets/justin.jpeg")}
            alt="Camera Shy"
          ></img>
          <div className="developer-container-middle">
            <h2 className="about-name"> Justin Hwang </h2>
            <div className="social-container">
              <a
                className="social-media-links"
                href="https://www.linkedin.com/in/jhpond-45569272"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a
                className="social-media-links"
                href="https://github.com/jkhbuild"
                target="_blank"
              >
                <i class="fa-brands fa-square-github"></i>
              </a>  
            </div>
          </div>
          <p className="about-description">Team Lead - Flex Developer</p>
        </div>
      </div>
      <div>
        <img
          className="about-media-picture"
          src={require("../../assets/bridge.jpg")}
          alt="help"
        ></img>
      </div>
    </div>
  );
};

export default AboutPage;
