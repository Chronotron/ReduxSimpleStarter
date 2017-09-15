import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyB91znDHcf3pSYwflhZgIoO6azS-0d_elI';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term, this.state.selectedVideo)
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChanged={(term) => videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }

  videoSearch(term, selectedVideo) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos,
        selectedVideo: selectedVideo || videos[0]
      });
    });
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));

