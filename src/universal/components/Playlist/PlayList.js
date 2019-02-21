import React, { Component, PureComponent } from 'react';
import MusicItem from './MusicItem';
import { List, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache } from "react-virtualized";

export default class PlayList extends PureComponent  {
	constructor() {
	  super();

	  this.cache = new CellMeasurerCache({
	    fixedWidth: true,
	    fixedHeight: true,
	    defaultWidth:622,
	    defaultHeight: 55
	  });
	}

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.playlist.length !== nextProps.playlist.length;
	// }
 
	renderRow = ({ index, key, style, parent  }) => {
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

		return (
				<WindowScroller>
					{
						({ height, isScrolling, registerChild, scrollTop }) => {
							return (
								<div className="playlist" ref={registerChild}>
								<List
									autoHeight
									isScrolling={isScrolling}
									scrollTop={scrollTop}
									height={height}
									rowHeight={rowHeight}
									rowRenderer={this.renderRow}
									rowCount={this.props.playlist.length}
									overscanRowCount={5}
									width={622}
								/>
								</div>
							)
						}
					}
				</WindowScroller>
		);
	}
}


