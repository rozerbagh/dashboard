import React from 'react';

class PAYNOW extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.open(`${this.props.payLink}`)
    }

    render() {
        return <div>
            PAYING
        </div>
    }
}

export default PAYNOW;
