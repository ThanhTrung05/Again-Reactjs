import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils"

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {

        let allDoctors = this.state.arrDoctors
        let { language } = this.props
        allDoctors = allDoctors.concat(allDoctors).concat(allDoctors)

        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-containter">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {allDoctors && allDoctors.length > 0 &&
                                allDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.value_vi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.value_en}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div key={index} className="section-customize">
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div className="bg-image section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
