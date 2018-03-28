import { Component } from 'react'

export default class ScrollY extends Component {
    state = {
        y: 0
    }

    handleWindowScroll = () => {
        this.setState({
          y: window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop
        });
    }

    componentDidMount() {
        this.handleWindowScroll();
        window.addEventListener('scroll', this.handleWindowScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll)
    }

  render() {
    return (
     this.props.render(this.state.y) 
    )
  }
}
