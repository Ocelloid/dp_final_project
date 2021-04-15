import React from 'react';
import nikita from "../../assets/nikita.png";
import clancy from "../../assets/clancy.png";
import default_picture from "../../assets/default.png";
import "./style.scss";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [
                {
                    name: "Nikita Grebnev",
                    picture_link: nikita,
                    description: "Software engineer specialising front-end applications utilizing ReactJS, Angular, Vue. Currently studying at Georgian College, on BDAT program.",
                    contact: "Nikita.Grebnev@MyGeorgian.ca",
                },
                {
                    name: "Shane Abeysekera",
                    picture_link: default_picture,
                    description: "Software engineer who specializes in AI and Machine learning. Worked as the backend developer for this project. Student at Georgian",
                    contact: "MahelaLashane.Abeysekera@MyGeorgian.ca",
                },
                {
                    name: "Clancy Macwan",
                    picture_link: clancy,
                    description: "Experienced as a network technician, recently studying BDAT at Georgian College.",
                    contact: "Clancyfrancisbhai.Macwan@mygeorgian.ca",
                },
            ]
        }
    }

    render() {
        let {people} = this.state;
        return <div className={"about-wrapper"}>
            <h1>About us</h1>
            {!!people.length && people.map(person => <AboutUnit person={person}/>)}
        </div>;
    }
}

class AboutUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: props.person
        }
    }

    render() {
        let {person} = this.state;
        return <div className={"about-unit"}>
            <div className={"about-picture-wrapper"}>
                <img src={person.picture_link} alt={"profile picture"}/>
            </div>
            <div className={"about-profile"}>
                <h2>{person.name}</h2>
                <span className={"about-description"}>
                    {person.description}
                </span>
                <span className={"about-description"}>
                    Contact: <a href={"mailto:" + person.contact}>{person.contact}</a>
                </span>
            </div>
        </div>
    }
}