// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import SimpleCard from './cards.js'



const TabContainer = props =>
  <div style={{ padding: 20 }}>
    {props.children}
  </div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
}));

class BasicTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      posts: [],
    };
    this.getDate();
  }

  getDate = async ( ) => {
    const data = await fetch('http://localhost:4000/posts');
    const posts = await data.json();
    this.setState({ posts });
  }

  handleChange = async (event, index) => {
    this.setState({ index });
    const homepage = 'http://localhost:4000/posts'
    let url;
    switch(index){
      case 0:
      url = homepage;
      break;
      case 1:
      url = `${homepage}?sortBy=time`;
      break;
      case 2:
      url = `${homepage}?sortBy=downvote`;
      break;
      default:
    }
    const response = await fetch(url);
    const posts = await response.json();
    this.setState({ posts });

  };

  render() {
    const classes = this.props.classes;
    if (this.state.posts === undefined ){
      return null
    }
    return (
      <div className={classes.root}>
        {/* <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            @chan
          </Typography>
        </Toolbar>
        </AppBar> */}
          <Tabs index={this.state.index} onChange={this.handleChange} centered>
            <Tab label="Hot" />
            <Tab label="New" />
            <Tab label="Controversial" />
          </Tabs>
        {this.state.index === 0 &&
          <TabContainer>
            {
              <div>
                {`Item One ${this.state.index}` }
                {this.state.posts.map(SimpleCard)}
              </div>}
          </TabContainer>}
        {this.state.index === 1 &&
          <TabContainer>
            <div>
              {`Item Two ${this.state.index}` }
              {this.state.posts.map(SimpleCard)}
          </div>
          </TabContainer>}
            {/* console.log('hhh') */}
        {this.state.index === 2 &&
          <TabContainer>
            {`Item Three ${this.state.index}`}
            {this.state.posts.map(SimpleCard)}
          </TabContainer>}
      </div>
    );
  }
}

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(BasicTabs);