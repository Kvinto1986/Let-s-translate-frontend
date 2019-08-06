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
            translateCost: (langSelect.value + this.state.secondLangVal) / 2
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
            translateCost: (this.state.firstLangVal + langSelect.value) / 2
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

        const validlanguages = ["English", "Russian", "Spanish", "Deutsch", "Polish", "Japanese", "Chinese", "Hindi", "Portuguese", "French", "Italian"];

        const arr=["Deutsch","Chinese"]

        if(validlanguages.includes(arr.join(','))){
            console.log('EEEEEEEEEEEEEEEEEEEEE!'+arr.join(','))
        }

        else  console.log('NOOOOOOOOOOOOOO'+arr.join(','))

        return (
            <div className='landing col-12 d-flex justify-content-center align-items-center'>
                <div className="row">
                        <section className="main_title-wrapper col-12">
                            <div className="passiveLandingTitleAbstraction1 text-light"></div>
                            <h1 className="main_h1 display-1">
                                Let's translate 
                            </h1>
                            <b>
                                <small>A client platform for language translations</small>
                            </b>
                        </section>
                        <section className="carousel-wrapper">
                            <div id="carouselExampleIndicators" className="carousel slide mt-3 col-12" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner border-info rounded-lg">
                                    <div className="carousel-item active">
                                        <img className="d-block w-100 h-25 " src={translate1Image} alt="First slide" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 className='text-warning'>Best of ever translators!</h2>
                                            <h4 >Our translators make translates so fast!</h4>
                                        </div>
                                    </div>
                                    <div className="carousel-item border-info rounded-lg">
                                        <img className="d-block w-100 " src={translate2Image} alt="Second slide" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 className='text-warning'>Best of ever translators!</h2>
                                            <h4>Our translators make translates so fast!</h4>
                                        </div>
                                    </div>
                                    <div className="carousel-item border-info rounded-lg">
                                        <img className="d-block w-100" src={translate3Image} alt="Third slide" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h2 className='text-warning'>Best of ever translators!</h2>
                                            <h4 >Our translators make translates so fast!</h4>
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
                        </section>
                        <section className="costCalculator-wrapper col-12">
                            <div className="container d-flex flex-column justify-content-center align-items-center">
                                <h2 className="display-4 mt-5 mb-5 text-center" id="home__calculator_label">Calculate the cost of translation</h2>
                                <div className="select-wrapper text-dark">
                                    <label className='text-light'>From</label>
                                    <Select
                                        value={firstLang}
                                        onChange={this.handleChangeFirstLang}
                                        options={languages}
                                    />
                                </div>
                                <div className="select-wrapper text-dark">
                                    <label className='mt-3 text-light'>To</label>
                                    <Select
                                        value={secondLang}
                                        onChange={this.handleChangeSecondLang}
                                        options={languages}
                                    />
                                </div>
                                <p>
                                    {
                                        this.state.firstLangVal > 0 && 
                                        this.state.secondLangVal > 0 
                                        ? (
                                            <h3 className={'text-light text-center mt-3'} id="calculator__totalCost_label">
                                                Total translate cost: <b>{this.state.translateCost}$</b> for 1000 characters
                                            </h3>
                                        )
                                        : null
                                    }
                                </p>
                                <div className="byTag">
                                    <p className="text-center">By React Team 2019™</p>
                                </div>
                            </div>
                        </section>
                </div>
            </div>
        )
    }
};


export default connect()(withRouter(Home))