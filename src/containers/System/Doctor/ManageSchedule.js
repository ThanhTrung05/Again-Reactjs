import React, { Component } from 'react';
import { connect } from "react-redux";

class ManageSchedule extends Component {
    render() {
        return (
            <React.Fragment>
                <div>manage schedule</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

