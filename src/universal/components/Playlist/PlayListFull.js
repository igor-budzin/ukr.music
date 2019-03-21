import React, { Component, PureComponent } from 'react';
import MusicItem from './MusicItem';
import { List, InfiniteLoader, WindowScroller, CellMeasurer, CellMeasurerCache } from "react-virtualized";

export default class PlayListFull extends PureComponent {
	constructor() {
		super();

		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			fixedHeight: true,
			defaultWidth: 622,
			defaultHeight: 65
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
				<div style={style}>
					<MusicItem
						handleChoseAudio={this.props.handleChoseAudio}
						handleEditAudio={this.props.handleEditAudio}
						handleGetPlaylists={this.props.handleGetPlaylists}
						currentId={this.props.currentId}
						isPlaying={this.props.isPlaying}
						isLoading={this.props.isLoading}
						_id={this.props.playlist[index]._id}
						link={this.props.playlist[index].link}
						key={key}
						artist={this.props.playlist[index].artists}
						title={this.props.playlist[index].title}
						picture={this.props.playlist[index].picture}
						duration={this.props.playlist[index].duration}
						mini={this.props.mini}
					/>
				</div>
			</CellMeasurer>
		);
	}

	render() {
		const rowHeight = this.props.mini ? 45 : 57;
		const size = this.props.playlist.length;
		const loadMoreRows = this.props.isNextPageLoading ? () => {} : this.props.loadNextPage;
		// const loadMoreRows = () => { console.log('111111111111') };
		const isRowLoaded = ({ index }) => !this.props.hasNextPage || index < size;
		// const isRowLoaded = ({ index }) => false;
		// const isRowLoaded = ({index}) => { console.log('2222222222222222') }
		const rowCount = this.props.hasNextPage ? size + 1 : size

		return (
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={loadMoreRows}
				rowCount={rowCount}
			>
				{({ onRowsRendered, registerChild }) => (
					<WindowScroller>
						{
							({ height, isScrolling, registerChild, scrollTop }) => {
								return (
									<div className="playlist" ref={registerChild}>
									<List
										autoHeight
										onRowsRendered={onRowsRendered}
										isScrolling={isScrolling}
										scrollTop={scrollTop}
										height={height}
										rowHeight={rowHeight}
										rowRenderer={this.renderRow}
										rowCount={size}
										overscanRowCount={5}
										width={622}
										ref={ref => this.refs = ref}
									/>
									</div>
								)
							}
						}
					</WindowScroller>
				)}
			</InfiniteLoader>
		);
	}
}


