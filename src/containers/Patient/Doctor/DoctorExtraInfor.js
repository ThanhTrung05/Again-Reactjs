import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DoctorExtraInfor.scss';
import { getDetailInfoDoctor, getScheduleDoctorByDate } from '../../../services/userServices'
import { LANGUAGES } from "../../../utils"
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';


class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: true,
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Phòng khám Chuyên khoa Da Liễu</div>
                    <div className="detail-address">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false && <div>
                        <div className="short-infor">GIÁ KHÁM: 300.000đ.  <span
                            onClick={() => this.showHideDetailInfor(true)}
                        >
                            Xem chi tiết
                        </span>
                        </div>

                    </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">GIÁ KHÁM: </div>
                            <div className="detail-infor">
                                <div className="price">
                                    <span className="left">GIÁ KHÁM</span>
                                    <span className="right">300.000đ</span>
                                </div>
                                <div className="note">
                                    Được ưu tiên khám trước khi đặt khám qua BookingCare.com.
                                </div>

                            </div>
                            <div className="payment">
                                Người bệnh có thể thanh toán chi phí bằng hingf thứ tiền mặt và quẹt thẻ.
                            </div>
                            <span
                                className="hide-price"
                                onClick={() => this.showHideDetailInfor(false)}
                            >
                                Ẩn bảng giá
                            </span>
                        </>
                    }

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
