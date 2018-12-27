// Libraries
import React, { Component } from 'react';

import Button from '../Commons/Button';

export default class TopMusicSection extends Component {

	render() {
		return (
			<div className="profile-section top-audio">
				<div className="title">
					<span>ТОП-треки</span>
					<a className="link" href="javascript:void(0)">Всі треки</a>
				</div>

				<div className="body">
					<div className={'audio-row'}>
						<div className="audio-row-cover">
							<div className="bg"></div>
						</div>
						<div className="audio-row-desc">
							<div className="singer"><a href="javascript:void(0);">Forever More</a></div>
							<div className="song"><a href="javascript:void(0);">Залізна ластівка</a></div>
						</div>
					</div>

					<div className={'audio-row'}>
						<div className="audio-row-cover">
							<div className="bg"></div>
						</div>
						<div className="audio-row-desc">
							<div className="singer"><a href="javascript:void(0);">Doctor Thomases</a></div>
							<div className="song"><a href="javascript:void(0);">Perfection Is a Lie</a></div>
						</div>
					</div>

					<div className={'audio-row'}>
						<div className="audio-row-cover">
							<div className="bg"></div>
						</div>
						<div className="audio-row-desc">
							<div className="singer"><a href="javascript:void(0);">Коханці</a></div>
							<div className="song"><a href="javascript:void(0);">Залізна ластівка</a></div>
						</div>
					</div>

					<div className={'audio-row'}>
						<div className="audio-row-cover">
							<div className="bg"></div>
						</div>
						<div className="audio-row-desc">
							<div className="singer"><a href="javascript:void(0);">Helpless</a></div>
							<div className="song"><a href="javascript:void(0);">Perfection Is a Lie</a></div>
						</div>
					</div>

					<div className={'audio-row'}>
						<div className="audio-row-cover">
							<div className="bg"></div>
						</div>
						<div className="audio-row-desc">
							<div className="singer"><a href="javascript:void(0);">Make-up</a></div>
							<div className="song"><a href="javascript:void(0);">Stones and Honey</a></div>
						</div>
					</div>

					<div className={'audio-row'}>
						<div className="audio-row-cover">
							<div className="bg"></div>
						</div>
						<div className="audio-row-desc">
							<div className="singer"><a href="javascript:void(0);">Tony, Talk!</a></div>
							<div className="song"><a href="javascript:void(0);">Cold Altair</a></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
