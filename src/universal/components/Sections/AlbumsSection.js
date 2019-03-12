// Libraries
import React, { Component } from 'react';
import SlickSlider from "react-slick";

export default class AlbumsSection extends Component {
	handleRightSlide = () => {
		this.slider.slickNext();
	};

	handleLeftSlide = () => {
		this.slider.slickPrev();
	};

	render() {
		const settings = {
			dots: false,
			infinite: false,
			speed: 200,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false
		};
		return (
			<div className="section albums">
				<link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />

				<div className="title">
					<span>Популярні альбоми</span>

					<div className="slider-control">
						<div className="arrow left" onClick={this.handleLeftSlide}></div>
						<div className="arrow right" onClick={this.handleRightSlide}></div>
					</div>

					<a className="link" href="javascript:void(0)" style={{"marginRight": "70px"}}>Всі альбоми</a>
				</div>

				<div className="body">
					<SlickSlider ref={c => (this.slider = c)} {...settings}>
						<div className="album">
							<img src="https://localhost:8080/api/albumCover/MAXIMALISM.jpg" alt=""/>
							<div className="album-name">Perfection Is a Lie</div>
							<div className="album-year">2017</div>
						</div>
						<div className="album">
							<img src="https://localhost:8080/api/albumCover/epolets-album.jpg" alt=""/>
							<div className="album-name">Cold Altair</div>
							<div className="album-year">2014</div>
						</div>
						<div className="album">
							<img src="https://localhost:8080/api/albumCover/thehardkiss-album.jpg" alt=""/>
							<div className="album-name">Stones and Honey</div>
							<div className="album-year">2014</div>
						</div>
						<div className="album">
							<img src="https://localhost:8080/api/albumCover/ThePrettyReckless.jpg" alt=""/>
							<div className="album-name">Залізна ластівка</div>
							<div className="album-year">2018</div>
						</div>
						<div className="album">
							<img src="https://localhost:8080/api/albumCover/color-album.jpg" alt=""/>
							<div className="album-name">Lovers</div>
							<div className="album-year">2016</div>
						</div>
						<div className="album">
							<img src="https://localhost:8080/api/albumCover/mort-album.jpg" alt=""/>
							<div className="album-name">Stones and Honey</div>
							<div className="album-year">2015</div>
						</div>
					</SlickSlider>
				</div>
			</div>
		);
	}
}
