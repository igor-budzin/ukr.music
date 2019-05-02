import React, { Component, PureComponent } from 'react';
import MusicItem from './MusicItem';
import PropTypes from 'prop-types';
import {
  List,
  InfiniteLoader,
  WindowScroller,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";

export default class AudioListFull extends PureComponent {
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
            onChoseAudio={this.props.onChoseAudio}
            handleAddToUser={this.props.handleAddToUser}
            handleGetPlaylists={this.props.handleGetPlaylists}
            currentId={this.props.currentId}
            isPlaying={this.props.isPlaying}
            isLoading={this.props.isLoading}
            key={key}
            audio={this.props.audioList[index]}
            mini={false}
          />
        </div>
      </CellMeasurer>
    );
  }

  render() {
    const rowHeight = this.props.mini ? 45 : 57;
    const size = this.props.audioList.length;
    const loadMoreRows = this.props.isNextPageLoading ? () => {} : this.props.loadNextPage;
    const isRowLoaded = ({ index }) => !this.props.hasNextPage || index < size;
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

AudioListFull.propTypes = {
  onChoseAudio: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentId: PropTypes.string.isRequired,
  audioList: PropTypes.array.isRequired
};
