// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import 'universal/assets/styles/commons/search.scss';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchField extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      activeIndex: null
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.keyControl);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyControl);
  }

  keyControl = event => {
    const { activeIndex } = this.state;

    switch(event.keyCode) {
       case 38: // Arrow Up
        if(activeIndex === null || activeIndex - 1 < 0) {
          this.setState({ activeIndex: data.length - 1 });
        }
        else if(activeIndex - 1 >= 0) {
          this.setState({ activeIndex: activeIndex - 1 });
        }

       break;

       case 40: // Arrow Down
        if(activeIndex === null || activeIndex + 1 > data.length - 1) {
          this.setState({ activeIndex: 0 });
        }
        else if(activeIndex + 1 <= data.length - 1) {
          this.setState({ activeIndex: activeIndex + 1 });
        }
       break;

       case 13:
        if(activeIndex !== null) {

        }
       break;
    }
  }

  handleChangeInput = () => {
    this.setState({ activeIndex: null });
  }

  render() {
    return (
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Пошук..."
          onChange={this.handleChangeInput}
        />

        <div className="autocomplete">
          {data.length && data.map((item, index) => {
            return(
              <SearchItem
                key={index}
                item={item}
                active={this.state.activeIndex === index}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

const SearchItem = props => {
  return (
    <div className={classNames(
      'search-item',
      props.item.type,
      { active: props.active }
    )}>
      { props.item.type !== 'search' && <div className="cover"></div> }

      <div className="description">
        <div className="title">{props.item.title}</div>
        { props.item.type !== 'search' && <div className="sub-title">{props.item.subtitle}</div> }
      </div>
    </div>
  )
}

const data = [
  { type: 'audio', title: 'The Hardkiss', 'subtitle': 'Трек виконавця The Hardkiss'},
  { type: 'audio', title: 'The Hardkiss', 'subtitle': 'Трек виконавця The Hardkiss'},
  { type: 'album', title: 'The Hardkiss', 'subtitle': 'Альбом виконавця The Hardkiss'},
  { type: 'artist', title: 'The Hardkiss', 'subtitle': 'Виконавець'},
  { type: 'search', title: 'Залізна ластівка' }
];