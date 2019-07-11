import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';

import Select from 'react-select';
import languages from '../../resources/JSON/languages'
import translate1Image from '../../resources/images/carousel/translate1.jpg'
import translate2Image from '../../resources/images/carousel/translate2.jpeg'
import translate3Image from '../../resources/images/carousel/translate3.jpg'

class Home extends Component {

    state = {
        firstLang: '',
        firstLangVal: 0,
        secondLang: '',
        secondLangVal: 0,
        translateCost: 0,
    };

    handleChangeFirstLang = (langSelect) => {

        this.setState({
            firstLang: langSelect.label,
            firstLangVal: langSelect.value,
            translateCost: (langSelect.value + this.state.secondLangVal) / 2 * 10
        });

        if(langSelect.label===this.state.secondLang){
            this.setState({
                translateCost: 0
            });
        }

    };

    handleChangeSecondLang = (langSelect) => {

        this.setState({
            secondLang: langSelect.label,
            secondLangVal: langSelect.value,
            translateCost: (this.state.firstLangVal + langSelect.value) / 2 * 10
        });

        if(langSelect.label===this.state.firstLang){
            this.setState({
                translateCost: 0
            });
        }

    };

    render() {
        const {firstLang} = this.state.firstLang;
        const {secondLang} = this.state.secondLang;

        return (
            <div className='landing col-12 mt-5 d-flex justify-content-between align-items-center'>
                <div id="carouselExampleIndicators" className="carousel slide mt-3 col-8" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner border-info rounded-lg">
                        <div className="carousel-item active">
                            <img className="d-block w-100 " src={translate1Image} alt="First slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Best of ever translators!</h5>
                                <p>Our transloators make translates so fast!</p>
                            </div>
                        </div>
                        <div className="carousel-item border-info rounded-lg">
                            <img className="d-block w-100 " src={translate2Image} alt="Second slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Best of ever translators!</h5>
                                <p>Our transloators make translates so fast!</p>
                            </div>
                        </div>
                        <div className="carousel-item border-info rounded-lg">
                            <img className="d-block w-100 " src={translate3Image} alt="Third slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Best of ever translators!</h5>
                                <p>Our transloators make translates so fast!</p>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className='col-4'>
                    <h2>Calculate the cost of translation</h2>
                    <label>From</label>
                    <Select
                        value={firstLang}
                        onChange={this.handleChangeFirstLang}
                        options={languages}
                    />
                    <label className={'mt-3'}>To</label>
                    <Select
                        value={secondLang}
                        onChange={this.handleChangeSecondLang}
                        options={languages}
                    />

                    {this.state.firstLangVal>0&&this.state.secondLangVal>0?(<h3 className={'text-primary mt-3'}>
                        Total translate cost: {this.state.translateCost}$ for 1000 characters</h3>):null}
                </div>
            </div>
        )
    }
};


export default connect()(withRouter(Home))