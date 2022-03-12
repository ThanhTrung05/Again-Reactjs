import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss';
import { postVerifyBookAppointment } from '../../services/userServices'
// import { LANGUAGES } from "../../../utils"
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader'

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stateVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);

            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res & res.errCode === 0) {
                this.setState({
                    stateVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    stateVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })

            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }



    render() {

        let { stateVerify, errCode } = this.state
        console.log('>>> Yuric check state: ', this.state)
        return (

            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {stateVerify === false ?
                        <div>
                            Loading data ...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className="infor-booking">Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
                                :

                                <div className="infor-booking">Xác nhận lịch hẹn thành công</div>
                            }
                        </div>
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
