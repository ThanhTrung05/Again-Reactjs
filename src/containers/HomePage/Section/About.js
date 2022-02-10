/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {


    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói vể channel Hỏi Dân IT
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/GZlhiKGkSRc?list=PLncHg6Kn2JT7q7xHz8Ns3vP0ETxMJ78ts"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>
                            Để có thể làm giao diện một website, việc lựa chọn một Frontend Framework sẽ hộ trợ chúng ta  giải quyết rất nhiều bài toán, có thể kể đến như hiệu năng website (performance), công việc bảo trì (maintain) và mở rộng (scale) sau này.
                            Có thể kể đến 3 Frameworks nổi tiếng nhất hiện nay về làm Frontend: Anuglar (Angular 2 và Angular.JS), Vue.JS và React.JS.
                            Vậy câu hỏi đặt ra là tại sao mình lại lựa chọn React.JS cho dự án của chúng ta.
                            Hãy cùng nhau tìm câu trả lời trong video này các bạn nhé ^^
                        </p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
