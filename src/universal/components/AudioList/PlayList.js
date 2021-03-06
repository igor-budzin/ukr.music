import React, { Component, PureComponent } from 'react';
import MusicItem from './MusicItem';
import { List, InfiniteLoader, CellMeasurer, CellMeasurerCache } from "react-virtualized";

export default class PlayList extends PureComponent {
	constructor() {
		super();

		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			fixedHeight: true,
			defaultWidth: 622,
			defaultHeight: 45
		});
	}

	componentWillReceiveProps(){
		this.refs.forceUpdateGrid();
	}

	renderRow = ({ index, key, style, parent }) => {
		return (
			<CellMeasurer 
				key={key}
				cache={this.cache}
				parent={parent}
				columnIndex={0}
				rowIndex={index}
			>
				<MusicItem
					style={style}
					handleChoseAudio={this.props.handleChoseAudio}
					handleEditAudio={this.props.handleEditAudio}
					isPlay={this.props.currentId === this.props.playlist[index]._id && this.props.isPlaying}
					_id={this.props.playlist[index]._id}
					link={this.props.playlist[index].link}
					key={key}
					artist={this.props.playlist[index].artists}
					title={this.props.playlist[index].title}
					time={this.props.playlist[index].duration}
					picture={this.props.playlist[index].picture}
					duration={this.props.playlist[index].duration}
					mini={this.props.mini}
				/>
			</CellMeasurer>
		);
	}

	render() {
		const rowHeight = this.props.mini ? 45 : 55;
		const size = this.props.playlist.length;
		const loadMoreRows = this.props.isNextPageLoading ? () => {} : this.props.loadNextPage;
		const isRowLoaded = ({ index }) => !this.props.hasNextPage || index < size;
		const rowCount = this.props.hasNextPage ? size + 1 : size

		return (
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={loadMoreRows}
				rowCount={rowCount}
			>
				{({ onRowsRendered, registerChild }) => {
					return (
						<div className="playlist" ref={registerChild}>
							<List
								autoHeight
								onRowsRendered={onRowsRendered}
								height={rowHeight}
								rowHeight={rowHeight}
								rowRenderer={this.renderRow}
								rowCount={size}
								overscanRowCount={5}
								width={622}
								ref={ref => this.refs = ref}
							/>
						</div>
					)
				}}
			</InfiniteLoader>
		);
	}
}


