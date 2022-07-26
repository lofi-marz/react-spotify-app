import { withRouter } from 'next/router';
import { Component } from 'react';

class ClassComponentExample extends Component {
    render() {
        const router = this.props.router;
        const { name, location, age, title } = router.query;
        return (
            <div className="flex flex-col rounded bg-black p-10 font-title text-white shadow shadow">
                <h1>
                    Hi! I&apos;m <span className="text-green-500">{name}</span>
                </h1>
                <h2>Location: {location}</h2>
                <h2>Age: {age}</h2>
                <h2>Title: {title}</h2>
            </div>
        );
    }
}

export default withRouter(ClassComponentExample);
