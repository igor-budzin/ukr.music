// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
// Components
import Button from '../Commons/Button';
// Actions
import * as musicDataActions from 'universal/redux/actions/musicDataActions';

const mapStateToProps = (state, props) => ({
	name: state.ArtistProfileReducer.name,
	topMusic: state.musicDataReducer.music
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({...musicDataActions}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class TopMusicSection extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.getArtistMusicList(this.props.artistName, this.props.limit);
	}

	render() {
		return (
			<Fragment>
				{
					this.props.topMusic.length ?
					(<div className="profile-section top-audio">
						<div className="title">
							<span>ТОП-треки</span>
							<a className="link" href="javascript:void(0)">Всі треки</a>
						</div>

						<div className="body">
							{
								this.props.topMusic.map((item, index) => {
									let style = {};
									if(item.picture) {
										style = { "backgroundImage": "url(data:image/png;base64," + item.picture + ")" };
									}

									return (
										<div className={'audio-row'} key={item._id + index}>
											<div className="audio-row-cover" style={style}>
												{
													item.isPlay && (
														<div className="bars">
															<div className="bar"></div>
															<div className="bar"></div>
															<div className="bar"></div>
															<div className="bar"></div>
															<div className="bar"></div>
														</div>
													)
												}
												<div className="bg"></div>
											</div>
											<div className="audio-row-desc">
												<div className="singer"><a href="javascript:void(0);">{item.artists}</a></div>
												<div className="song"><a href="javascript:void(0);">{item.title}</a></div>
											</div>
										</div>
									);
								})
							}
						</div>
					</div>) : null
				}
			</Fragment>
		);
	}
}
