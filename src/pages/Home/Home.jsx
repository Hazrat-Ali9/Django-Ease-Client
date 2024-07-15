import Banner from "../../components/Home/Banner";
import FeaturedTests from "../../components/Home/FeaturedTests";
import Promotions from "../../components/Home/Promotions";
import Recommendation from "../../components/Home/Recommendation";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedTests></FeaturedTests>
            <Promotions></Promotions>
            <Recommendation></Recommendation>
        </div>
    );
};

export default Home;