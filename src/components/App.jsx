import Modal from './Modal';
import Loader from './Loader';
import { Component, createRef } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Button from './common/Button/Button';
import ImageGalleryItem from './ImageGalleryItem';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=43897826-0f8632ff14c61d7f409caf77c&image_type=photo';

export class App extends Component {
  state = {
    searchTherm: '',
    isLoading: false,
    page: 1,
    error: null,
    isVisible: false,
    isModalVisible: false,
    src: '',
    alt: '',
    hits: [],
    searchNoFind: false,
  };

  modalRef = createRef();

  async componentDidMount() {
    document.body.addEventListener('mousedown', this.handleClickOutside);
    document.body.addEventListener('keydown', this.handleKeyDown);

    // console.log('did mount');
    // console.log(this.state.page);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.handleClickOutside);
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleModalClose() {
    this.setState({ isModalVisible: false });
    // console.log('click');
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.handleModalClose();
    }
  };

  handleClickOutside = ev => {
    if (this.modalRef.current && !this.modalRef.current.contains(ev.target)) {
      this.handleModalClose();
    }
  };

  openModal = e => {
    const image = e.target;

    // console.log(image.getAttribute('pageurl'));
    // console.log('openModal');

    const largeImageUrl = image.getAttribute('pageurl');

    this.setState({
      isModalVisible: true,
      src: largeImageUrl,
      alt: image.alt,
    });
  };

  async handleSearch() {
    // console.log(this.state.searchTherm);

    try {
      this.setState({
        isLoading: true,
        error: null,
        isVisible: true,
        page: 1,
      });
      const response = await axios.get(
        `&page=${this.state.page}&q=${this.state.searchTherm}&per_page=12`
      );
      // console.log(response.data);

      if (response.data.hits.length === 0) {
        this.setState({ isVisible: false, searchNoFind: true });
      } else {
        this.setState({ searchNoFind: false });
      }

      if (response.data.hits.length < 12) {
        this.setState({ isVisible: false });
      }

      this.setState({ hits: [...response.data.hits] });
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
      // console.log('finally');
    }
  }

  renderSearch = () => {
    return this.state.hits.map(hit => {
      return (
        <ImageGalleryItem
          key={hit.id}
          src={hit.webformatURL}
          alt={hit.tags}
          pageUrl={hit.largeImageURL}
          handleModal={this.openModal}
        />
      );
    });
  };

  handlechange = e => {
    // console.log(e.target.value);

    this.setState({
      searchTherm: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // console.log(this.state);
    this.setState({ page: 1 });

    const form = e.target;
    form.reset();
  };

  handlePage = async () => {
    this.setState({
      page: this.state.page + 1,
    });

    // console.log(this.state.searchTherm);

    try {
      this.setState({
        isLoading: true,
        error: null,
        isVisible: true,
      });
      const response = await axios.get(
        `&page=${this.state.page}&q=${this.state.searchTherm}&per_page=12`
      );
      // console.log(Math.ceil(response.data.totalHits / 12));

      if (Math.ceil(response.data.totalHits / 12) === this.state.page) {
        // console.log(response.data.hits.length);
        // console.log(this.state.page);
        // console.log('end');

        this.setState({ isVisible: false });
      }

      if (response.data.hits.length === 0) {
        this.setState({ isVisible: false, searchNoFind: true });
      } else {
        this.setState({ searchNoFind: false });
      }

      if (response.data.hits.length < 12) {
        this.setState({ isVisible: false });
      }

      this.setState({ hits: [...response.data.hits] });
    } catch (error) {
      this.setState({ error: error.message });
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
      // console.log('finally');
    }
  };

  // changePage = async () => {

  //   console.log(this.state.page);
  // };

  render() {
    return (
      <div className="App">
        <Modal isOpenModal={this.state.isModalVisible}>
          <img ref={this.modalRef} src={this.state.src} alt={this.state.alt} />
        </Modal>

        <Searchbar
          handlechange={this.handlechange}
          handleSubmit={this.handleSubmit}
          handleSearch={() => this.handleSearch()}
        />
        {this.state.page === 1 && (
          <ImageGallery>{this.renderSearch()}</ImageGallery>
        )}
        {this.state.page !== 1 && (
          <ImageGallery>{this.renderSearch()}</ImageGallery>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isVisible && (
          <Button
            type={'button'}
            handleClick={this.handlePage}
            variant="button"
          >
            Load more
          </Button>
        )}
        {this.state.searchNoFind && (
          <p className="null-results">This search has no results !</p>
        )}
      </div>
    );
  }
}
