/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {


    render() {
        return (
            <div className="homefooter">
                <p>&copy; 2022 hoidanit with Yuric.
                    More information, please visit my github.
                    <a target="_blank" href="https://github.com/ThanhTrung05">
                        &#8594; Click here &#8592;
                    </a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
