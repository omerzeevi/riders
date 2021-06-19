import PageHeader from "./common/pageHeader";

const Home = () => {
    return ( 
        <div className="container homePage">
            <PageHeader titleText="ISRiders" />
            <div className="row">
                <div className="col-12 homePageDescription">
                    <p>כל המדריכים הישראלים, בכל אתרי הסקי, בכל העולם, באתר אחד.</p>
                    <p>מטרת אתר זה היא לקשר בין המדריכים הישראלים השוהים באתרי הסקי בעולם לגולשים המעוניינים בהדרכה.</p>
                    <p>הרשמה חינם!</p>
                </div>
            </div>
        </div>
     );
}
 
export default Home;
