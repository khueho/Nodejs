import Snowfall from "../../components/Snowfall";
import "./styles.scss"

export const Home = () => {
    return <div className="landing-wrapper">
        <div className="container">
            <div className="cricle"></div>
            <Snowfall />
        </div>
    </div>;
}