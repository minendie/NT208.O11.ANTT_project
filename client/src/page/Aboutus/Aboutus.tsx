import image from '../../assets/image.png'
import logo_1 from '../../assets/img/logo-1.svg'
import logo_2 from '../../assets/img/logo-2.svg'
import pattern_dot_1 from '../../assets/img/pattern-dot-1.svg'
import logo_3 from '../../assets/img/logo-3.svg'
import logo_7 from '../../assets/img/logo-7.png'
import ornament_38_2 from '../../assets/img/ornament-38-2.svg'
import ornament_38_5 from '../../assets/img/ornament-38-5.svg'
import ornament_38_6 from '../../assets/img/ornament-38-6.svg'
import ornament_38_7 from '../../assets/img/ornament-38-7.svg'
import ornament_82_1 from '../../assets/img/ornament-82-1.png'
import ornament_83_1 from '../../assets/img/ornament-83-1.png'
import ornament_84_1 from '../../assets/img/ornament-84-1.png'
import ornament_86_1 from '../../assets/img/ornament-86-1.png'
import separator_1 from '../../assets/img/separator-1.svg'
import separator from '../../assets/img/separator.svg'
import unsplash_4ebhbxxckru from '../../assets/img/unsplash-4ebhbxxckru.png'
import unsplash_eq2z9ay9wws from '../../assets/img/unsplash-eq2z9ay9wws.png'
import unsplash_fhnnjk1yj7y from '../../assets/img/unsplash-fhnnjk1yj7y.png'
import unsplash_jibmsms4_ka from '../../assets/img/unsplash-jibmsms4-ka.png'
import unsplash_ph4skrfgyy from '../../assets/img/unsplash-ph4skrfgyy.png'
import './styles.css'
import { Link } from "react-router-dom";

const Aboutus = (): JSX.Element => {
    return (
        <div className="aboutus">
        <div className="container-wrapper">
          <div className="container">
            <div className="team-intro-content">
              <div className="frame">
                <div className="large">GREEN DOTS</div>
                <p className="p">
                  Green Dots is a platform that allows people to find and navigate nearby recycling collection points.
                  While this solution helps everyone easily access current recycling points around their neighborhood, it
                  also makes each individual a game-changer through additional features.
                </p>
                <Link to={"/"}>
                <div className="button-primary"><div className="label">Get started -&gt;</div></div>
                </Link>
              </div>
              <div className="div">
                <img className="pattern-dot" src={pattern_dot_1} />
                <img className="vector" src={image}></img>
              </div>
            </div>
            <div className="something">
              <div className="component-wrapper">
                <Link to={"/"}>
                    <div className="component">
                        <img className="ornament" src={ornament_38_2} />
                        <div className="h-large">Map for now!</div>
                    </div>
                </Link>
              </div>
              <div className="div-wrapper">
              <Link to={"/"}>
                <div className="component-2">
                  <img className="img" src={ornament_38_5} />
                  <div className="text-wrapper">Map for now!</div>
                </div>
                </Link>
              </div>
            </div>
            <div className="project-description">
              <div className="large-2">What we offer</div>
              <div className="product-wrapper">
                <div className="product-descriptions">
                  <div className="product-description">
                    <img className="logo" src={logo_1} />
                    <div className="title"><div className="text-wrapper-2">AI Tool</div></div>
                    <div className="description">
                      <p className="text-wrapper-3">
                      The AI waste detection tool quickly recognizes and categorizes various types of waste based on images, 
                      while providing detailed information on recycling methods and recycling locations, saving time and effort in searching.
                      </p>
                      <div className="go-to"><div className="go-to-2"><Link to={"/tool"}>Go to AI Tool -&gt;</Link></div></div>
                    </div>
                  </div>
                  <div className="separator"><img className="separator-2" src={separator} /></div>
                  <div className="product-description">
                    <img className="logo" src={logo_2} />
                    <div className="title"><div className="text-wrapper-2">Search tool</div></div>
                    <div className="description">
                      <p className="text-wrapper-3">
                      A map-based tool for searching waste collection campaigns, enabling users to locate nearby initiatives, 
                      fostering community engagement in waste management.
                      </p>
                      <div className="go-to-wrapper"><div className="go-to-3"><Link to={"/"}>Go to Home page -&gt;</Link></div></div>
                    </div>
                  </div>
                  <div className="separator"><img className="separator-3" src={separator_1} /></div>
                  <div className="product-description">
                    <img className="logo" src={logo_3} />
                    <div className="title"><div className="text-wrapper-2">Rating and review</div></div>
                    <div className="description">
                      <p className="text-wrapper-3">
                      A rating and review feature allows users to provide feedback and rate waste collection campaigns, 
                      promoting transparency and accountability in waste management efforts.
                      </p>
                      <div className="go-to-wrapper"><div className="go-to-3"><Link to={"/"}>Go to Home page -&gt;</Link></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="strength-content">
              <div className="group">
                <div className="overlap-group">
                  <div className="group-2">
                    <img className="ornament-2" src={ornament_82_1} />
                    <img className="ornament-3" src={ornament_83_1} />
                    <img className="ornament-4" src={ornament_84_1} />
                  </div>
                  <img className="ornament-5" src={ornament_86_1} />
                </div>
              </div>
              <div className="container-2">
                <div className="large-3">Why choose us?</div>
                <div className="container-3">
                  <div className="div-2">
                    <div className="description-2">
                      <p className="text-wrapper-4">
                        Utilizing our waste collection campaign search tool brings significant benefits.
                        With the ability to search nationwide, from the smallest nooks and crannies to major locations, users can easily identify ongoing waste collection campaigns throughout the country. 
                        Our tool visually displays these campaigns on a map and continuously updates them in real-time, making it easier than ever for 
                        waste management organizations and individuals eager to participate to find each other effortlessly.
                      </p>
                    </div>
                    <div className="thumbnail"><img className="unsplash" src={unsplash_ph4skrfgyy} /></div>
                  </div>
                  <div className="div-2">
                    <div className="div-3"><img className="unsplash-2" src={unsplash_eq2z9ay9wws} /></div>
                    <div className="description-2">
                      <p className="text-wrapper-5">
                      Our product saves time for campaign organizers and participants. Organizers can easily create campaign information with a few clicks, 
                      reaching a wide audience without the need for extensive advertising on scattered platforms. Participants can quickly and visually search for nearby campaigns, 
                      avoiding the hassle of outdated information on social media or general search engines.
                      </p>
                    </div>
                  </div>
                  <div className="div-2">
                    <div className="description-2">
                      <p className="text-wrapper-4">
                      Our product allows users to evaluate and rate campaigns, creating transparency and improved organization to enhance credibility. 
                      Additionally, it provides participants with the opportunity to share their reviews and feedback based on their experiences, 
                      while helping them discover high-quality and reliable campaigns that meet their expectations.
                      </p>
                    </div>
                    <div className="thumbnail"><img className="unsplash-2" src={unsplash_4ebhbxxckru} /></div>
                  </div>
                  <div className="div-2">
                    <div className="div-3"><img className="img-2" src={unsplash_jibmsms4_ka} /></div>
                    <div className="description-2">
                      <p className="text-wrapper-5">
                      Our AI-based waste classification tool empowers contributors to donate without prior knowledge of waste sorting. 
                      By leveraging the AI tool's predictions, individuals can confidently contribute their waste to the appropriate organization. 
                      This addresses a common barrier where people hesitate to donate because they are unsure about the type of waste they have or whether it is accepted by any organization. 
                      By eliminating this uncertainty, we encourage more individuals to actively participate in waste donation, ensuring their concerns for waste contribution are met.
                      </p>
                    </div>
                  </div>
                  <div className="div-2">
                    <div className="description-2">
                      <p className="text-wrapper-4">
                      Our platform enables organizers to create cost-effective campaigns, reaching participants without excessive advertising costs. 
                      With a user-friendly interface, efficient campaign setup and promotion are facilitated. By eliminating expensive advertising, 
                      resources can be allocated effectively for meaningful participant experiences. This fosters inclusivity, enabling a wider range of individuals to engage with campaigns and events. 
                      Our goal is to democratize the organizing process, ensuring impactful initiatives thrive irrespective of budget constraints.
                      </p>
                    </div>
                    <div className="thumbnail"><img className="img-2" src={unsplash_fhnnjk1yj7y} /></div>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="overlap-group">
                  <div className="group-2">
                    <img className="ornament-2" src={ornament_82_1} />
                    <img className="ornament-3" src={ornament_83_1} />
                    <img className="ornament-4" src={ornament_84_1} />
                  </div>
                  <img className="ornament-5" src={ornament_86_1} />
                </div>
              </div>
            </div>
            <div className="something">
              <div className="component-wrapper">
              <Link to={"/"}>
                <div className="component">
                  <img className="ornament" src={ornament_38_6} />
                  <div className="h-large">Map for now!</div>
                </div>
                </Link>
              </div>
              <div className="div-wrapper">
              <Link to={"/"}>
                <div className="component-2">
                  <img className="img" src={ornament_38_7} />
                  <div className="text-wrapper">Map for now!</div>
                </div>
                </Link>
              </div>
            </div>
            <div className="partner-content">
              <div className="large-4">Our partners</div>
              <div className="partners">
                <div className="element-partner">
                  <div className="div-3">
                    <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                  </div>
                  <div className="details">
                    <div className="partner-name-wrapper"><div className="partner-name">Thanh Hương</div></div>
                    <div className="brief-description-wrapper">
                        <p className="brief-description">
                            Studying at the University of Information Technology.
                        </p>
                    </div>
                    <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                  </div>
                </div>
                <div className="element-partner">
                  <div className="div-3">
                    <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                  </div>
                  <div className="details">
                    <div className="partner-name-wrapper"><div className="partner-name">Kim Uyên</div></div>
                    <div className="brief-description-wrapper">
                        <p className="brief-description">
                            Studying at the University of Information Technology.
                        </p>
                    </div>
                    <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                  </div>
                </div>
                <div className="element-partner">
                  <div className="div-3">
                    <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                  </div>
                  <div className="details">
                    <div className="partner-name-wrapper"><div className="partner-name">Uyển Nhi</div></div>
                    <div className="brief-description-wrapper">
                      <p className="brief-description">
                        Studying at the University of Information Technology.
                      </p>
                    </div>
                    <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                  </div>
                </div>
                <div className="element-partner">
                  <div className="div-3">
                    <div className="logo-wrapper"><img className="logo-2" src={logo_7} /></div>
                  </div>
                  <div className="details">
                    <div className="partner-name-wrapper"><div className="partner-name">Thanh Mai</div></div>
                    <div className="brief-description-wrapper">
                        <p className="brief-description">
                            Studying at the University of Information Technology.
                        </p>
                    </div>
                    <div className="contact-info-wrapper"><div className="contact-info">Website</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Aboutus;