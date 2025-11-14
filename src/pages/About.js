import './About.css';

import aboutBanner from '../assets/hellofreshImage.jpg';
import logo from '../assets/logo_no_bg.png';
import _1 from '../assets/desc-logo1.webp';
import _2 from '../assets/desc-logo2.webp';
import _3 from '../assets/desc-logo3.webp';
import exploreImg from '../assets/hellofreshimage 4-cropped.png';

function About() {
    return (
        <div class="about-body">
            <div class="banner">
                <img class="banner-img" src={aboutBanner}/>
                <h1 class="banner-text">Freshly</h1>
            </div>
            <div class="about-sections about-desc">
                <h1>Delivery of Fresh Food</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="about-sections about-adv">
                <h1>What we bring to your table</h1>
                <div class="adv-card-wrapper">
                    <div class="adv-card">
                        <img src={_1}/>
                        <p class="bolded-text">Fresh Ingredients</p>
                        <p>Guaranteed fresh from the fram to your doorstep.</p>
                    </div>
                    <div class="adv-card">
                        <img src={_2}/>
                        <p class="bolded-text">Sustainable Solutions</p>
                        <p>Reducing food waste and CO2 emissions.</p>
                    </div>
                    <div class="adv-card">
                        <img src={_3}/>
                        <p class="bolded-text">Meaningful Recipes</p>
                        <p>Affordable, time-saving homemade meals.</p>
                    </div>
                </div>
            </div>
            <div class="about-sections about-team">
                <h1>Brought to you by</h1>
                <h1>~ Kelompok 6 ~</h1>
                <div class="person-card">
                    <div class="person-card-img">
                        <img src={logo}/>
                    </div>
                    <div class="person-card-details">
                        <h1>Ahmad Hanif Naufal Jamil</h1>
                        <p>(1313624037)</p>
                        <p>Other details</p>
                    </div>
                </div>
                <div class="person-card" style={{flexDirection: "row-reverse"}}>
                    <div class="person-card-img">
                        <img src={logo}/>
                    </div>
                    <div class="person-card-details">
                        <h1>Rizky Wulan Purnamasari</h1>
                        <p>(1313624052)</p>
                        <p>Other details</p>
                    </div>
                </div>
                <div class="person-card">
                    <div class="person-card-img">
                        <img src={logo}/>
                    </div>
                    <div class="person-card-details">
                        <h1>Bara Juang Indonesiano</h1>
                        <p>(1313624078)</p>
                        <p>Other details</p>
                    </div>
                </div>
            </div>
            <div class="about-sections about-explore">
                <div class="explore-details">
                    <h1>Browse for today's meal!</h1>
                    <a class="bolded-text" href="/store">Explore</a>
                </div>
                <img class="explore-img" src={exploreImg}/>
            </div>
            {/* <h2>About AC Store</h2>
            <p>ACPowered (Alternate Current Store) is a digital store dedicated to delivering the best video game titles to gamers worldwide.</p>
            <p>Founded in 209, AC Store focuses on a curated library including Persona, Yakuza, Shin Megami Tensei, and more.</p>
            <p>We are committed to fair pricing and seamless experiences</p>
            <p><strong>“Beneficial for Developers, Publishers and Users like alternate current”</strong></p> */}
        </div>
    )
}

export default About