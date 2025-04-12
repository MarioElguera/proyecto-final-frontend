import EventsList from '../../components/EventList/EventsList';

const eventsData = [
    {
        id: 1,
        title: "Stream the Acme event",
        description: "Watch the amazing Acme show...",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+1",
        date: "12/04/2025"
    },
    {
        id: 2,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 2,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 3,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 4,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 5,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 5,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 5,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 5,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 5,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    }, {
        id: 5,
        title: "Contribute to the planet",
        description: "Plant a tree and help the environment",
        backgroundImage: "https://via.placeholder.com/600x400.png?text=Event+2",
        date: "12/04/2025"
    },
];

export default function EventPage() {
    return (
        <div>
            <EventsList events={eventsData} />
        </div>
    );
}