import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from '@material-ui/core';
import HighChartComponent from './charts/HighChartComponent';
import HighChartPie from './charts/HighChartPie';
import axios from 'axios';

export default class Graphs extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    name: PropTypes.string,
  }
  state = {
    username: 'wesbos',
    languagesPerRepo: {},
    starsPerRpo: {}
  }
  componentWillMount(){
    this.setState({username: this.props.username})
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return  nextProps.username !== this.props.username 
  // }
  componentDidMount() {
    this.reposPerLanguage()
  }

  reposPerLanguage() {
    axios.get(`https://api.github.com/users/${this.state.username}/repos`)
    .then((response) => {
      console.log(response.data)
      let languages = {}
      let starsPerRpo = {}
      response.data.map((repo) =>{ 
        if(repo.language !== null)
          languages[repo.language] ? ++languages[repo.language] : languages[repo.language] = 1 
        if(repo.stargazers_count !== null && repo.language !== null)
          starsPerRpo[repo.language] ? starsPerRpo[repo.language] += repo.stargazers_count : starsPerRpo[repo.language] = 1 
      })
      this.setState({languagesPerRepo: languages})
      this.setState({starsPerRpo: starsPerRpo})
    })
  }


  render() {
    return (
      <div >
        <Grid container item >
          <Grid item xs={12} sm={12} md={12}>
            <Card elevation={0}>
              <HighChartComponent />
            </Card>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={4} sm={4} md={4}>
              <Card elevation={0}>
                <HighChartPie title="COMMITS PER LANGUAGE" object={this.state.languagesPerRepo} />
              </Card>

            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Card elevation={0}>
                <HighChartPie title="REPOSITORIES PER LANGUAGE" object={this.state.languagesPerRepo} />
              </Card>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Card elevation={0}>
                <HighChartPie title="STARS PER LANGUAGE" object={this.state.starsPerRpo} />
              </Card>
            </Grid>

          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
              <Card elevation={0}>
                {/* <HighChartPie title="COMMITS PER LANGUAGE" object={this.state.languages}  /> */}
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
              <Card elevation={0}>
                {/* <HighChartPie title="REPOSITORIES PER LANGUAGE"  object={this.state.languages} /> */}
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </div>
    )
  }
}