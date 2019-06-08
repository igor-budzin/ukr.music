// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
  }

  componentDidMount() {
    document.addEventListener('keyup', this.keyControl);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.keyControl);
  }

  keyControl = event => {
    let searchItems = Array.prototype.slice.call(document.getElementsByClassName('search-item'));
    let activeIndex = 0;

    searchItems.map((item, index) => {
      if(item.classList.contains('active')) activeIndex = index;
    });

    switch(event.keyCode) {
      case 38:

      break;

      case 40:

        searchItems[activeIndex].classList.remove('active');
        if(activeIndex <= searchItems.length) {
          searchItems[++activeIndex].classList.add('active');
        }
      break;
    }
    console.log(activeIndex)
  }

  render() {
    return (
      <div className="search-wrapper">
        <input type="text" className="search-input" placeholder="Пошук..." />

        <div className="autocomplete">
          <div className="search-item audio">
            <div className="cover"></div>
            <div className="description">
              <div className="title">The Hardkiss</div>
              <div className="sub-title">Трек виконавця <b>The Hardkiss</b></div>
            </div>
          </div>

          <div className="search-item audio">
            <div className="cover"></div>
            <div className="description">
              <div className="title">The Hardkiss</div>
              <div className="sub-title">Трек виконавця <b>The Hardkiss</b></div>
            </div>
          </div>

          <div className="search-item artist">
            <div className="cover"></div>
            <div className="description">
              <div className="title">The Hardkiss</div>
              <div className="sub-title">Виконавець</div>
            </div>
          </div>

          <div className="search-item album">
            <div className="cover"></div>
            <div className="description">
              <div className="title">Залізна ластівка</div>
              <div className="sub-title">Альбом виконавця <b>The Hardkiss</b></div>
            </div>
          </div>

          <div className="search-item search">
            <div className="title">Залізна ластівка</div>
          </div>
        </div>
      </div>
    );
  }
}