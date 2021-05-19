import NavigationBar from '../components/navigation-bar/navbar'
import HeroSection from '../components/description-section/HeroSection'
import TeamSection from '../components/teams-section/team'
import ContactUs from '../components/contact-us-section/contact-us'
import Footer from '../components/footer-section/footer'

function HomePage() {
    return (
      <div style ={{backgroundColor: "#1c2237"
      }}>
        <NavigationBar/>
        <HeroSection/>
        <TeamSection/>
        <ContactUs/>
        <Footer/>
      </div>
    );
  }
  
  export default HomePage;
  