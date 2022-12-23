import './About.scss';

const AboutPage = () => {

    return (
        <div className="about">
            <div className="about-container">
                <div className="developer-container">
                    <img className="about-img" src={require('../../assets/bonnie.jpeg')} alt="Camera Shy"></img>
                    <div className="developer-container-middle">
                        <h2 className="about-name"> Bonnie Li</h2>
                        <div className="social-container">
                            <a><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://github.com/bonnieli51"><i class="fa-brands fa-square-github"></i></a>
                        </div>
                    </div>
                    <p className="about-description">
                        League of legends iron player. Misses most skillshots and best suited for support roles.
                        Has not made her bed in 25 years of living. Mostly found in a state of panic.
                    </p>
                </div>
                <div className="developer-container">
                    <img className="about-img" src={require('../../assets/gleb.jpeg')} alt="Camera Shy"></img>
                    <div className="developer-container-middle">
                        <h2 className="about-name"> Gleb Mirzayev </h2>
                        <div className="social-container">
                            <a><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://github.com/gmirzayev"><i class="fa-brands fa-square-github"></i></a>
                        </div>
                    </div>                
                    <p className="about-description">
                        Ex KGB Hacker known for swaying the 2020 US election. Grandmaster in starcraft and has 250+ apms.
                        Less than 110 WPM on monkeytype. Likes boston cremes.
                    </p>
                </div>


                <div className="developer-container">
                    <img className="about-img" src={require('../../assets/jeremy.png')} alt="Camera Shy"></img>
                <div>
                    <div className="developer-container-middle">
                        <div>
                            <h2 className="about-name"> Jeremy Santiago </h2>
                        </div>
                        <div className="social-container">
                            <a><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://github.com/sajeremy"><i class="fa-brands fa-square-github"></i></a>
                        </div>
                    </div>
                </div>             
                    <p className="about-description">
                        The hardest worker in this group... Jeremy made a living on the poles prior to appacademy.
                        Total earnings equate to $9.00 USD. You'll find him playing hackysack or at Champion's pizza.
                        This man lives in the backend
                    </p>
                </div>


                <div className="developer-container">
                    <img className="about-img" src={require('../../assets/justin.jpeg')} alt="Camera Shy"></img>
                    <div className="developer-container-middle">
                        <h2 className="about-name"> Justin Hwang </h2>
                        <div className="social-container">
                            <a><i class="fa-brands fa-linkedin"></i></a>
                            <a href="https://github.com/jkhbuild"><i class="fa-brands fa-square-github"></i></a>
                        </div>         
                    </div>       
                    <p className="about-description">
                        Justin served as team lead and project flex. He handled the implementation of API's on this project.
                    </p>
                </div>
            </div>
            <div>
                <img className="about-media-picture" src={require('../../assets/bridge.jpg')} alt="help"></img>
            </div>
        </div>
    )
}

export default AboutPage