import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from '@material-ui/core';
import HighChartComponent from './charts/HighChartComponent';
import HighChartPie from './charts/HighChartPie';
import axios from 'axios';

export default class Graphs extends React.Component {

  static propTypes = {
    name: PropTypes.string,
  }
  state = {
    username: 'wesbos',
    languagesPerRepo: null,
    starsPerRpo: null,
    years : null
  }
  months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    
  componentWillMount(){
    this.setState({username: this.props.username})
  }
  componentDidMount() {
    this.reposPerLanguage()
  }

  reposPerLanguage() {
    const body = {
      "query": `query {
        user(login: "${this.state.username}") {
          name
          contributionsCollection {
            contributionCalendar {
              colors
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
                firstDay
              }
            }
          }
        }
      }
         `
  }
  axios.post('https://api.github.com/graphql', body, {  headers: {
      "Authorization" : "token 59dafcf27ebf9fd433e2bd3f51178a5ea5d7cc91"
    }}).then((response) => {
      if(response.data) {
      let yearsObject={}
      let weeks  = response.data.data.user.contributionsCollection.contributionCalendar.weeks
      weeks.forEach((day) => {
        let month = day.firstDay.substring(5,7)
        let year = day.firstDay.substring(2,4)
        let count = 0;
        day.contributionDays.forEach((weekDay) => {
           count += weekDay.contributionCount;
        })   
      let key = `${this.months[parseInt(month)-1]} ${year}`
      yearsObject[key] ? yearsObject[key] += count  : yearsObject[key] = count
      })
      this.setState({years : yearsObject}) 
    }
  })

  axios.get(`https://api.github.com/users/${this.state.username}/repos?per_page=2000`, {
    headers: {
      "Authorization" : "token 59dafcf27ebf9fd433e2bd3f51178a5ea5d7cc91"
  }}).then((response) => {
    let languages={}
    let starsPerRpo={} 
    response.data.forEach((repo) => {
      if(repo.language !== null){
        languages[repo.language] ?  ++languages[repo.language] : languages[repo.language] = 1 
      }
      if(repo.stargazers_count !== null && repo.language !== null)
        starsPerRpo[repo.language] ? starsPerRpo[repo.language] += repo.stargazers_count : starsPerRpo[repo.language] = 1 
    })
    this.setState({languagesPerRepo: languages})
    this.setState({starsPerRpo: starsPerRpo})
    }).catch(err => console.log(err))  
  }

  render() {
    return (
      <div >
        <Grid container item >
          <Grid item xs={12} sm={12} md={12}>
            <Card elevation={0}>
              <HighChartComponent object={this.state.years} />
            </Card>
          </Grid>

          <Grid container spacing={2}>
            {/* <Grid item xs={4} sm={4} md={4}>
              <Card elevation={0}>
                <HighChartPie title="COMMITS PER LANGUAGE" object={this.state.languagesPerRepo} />
              </Card>

            </Grid> */}

            <Grid item xs={6} sm={6} md={6}>
              <Card elevation={0}>
                <HighChartPie title="REPOSITORIES PER LANGUAGE" object={this.state.languagesPerRepo} />
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={6}>
              <Card elevation={0}>
                <HighChartPie title="STARS PER LANGUAGE" object={this.state.starsPerRpo} />
              </Card>
            </Grid>

          </Grid>
        </Grid>
      </div>
    )
  }
}
