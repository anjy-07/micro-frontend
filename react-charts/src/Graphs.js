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
    starsPerRpo: {},
    years : null,
    finalYearsObject : null,
    startMonth: '',
    startYear: ''
  }
  months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    
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
    let t = new Date()
    let monthsAgoDate = new Date(t.setMonth(t.getMonth() - 12)).toLocaleDateString();
    let month = monthsAgoDate.substring(3,5);
    let oneYearAgo = monthsAgoDate.substring(6,10);
    let todayYear = parseInt(oneYearAgo)+ 1

    this.setState({startMonth: month})
    this.setState({startYear: oneYearAgo})
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    
    axios.get(`https://api.github.com/users/${this.state.username}/repos`, {
      headers: {
        "Authorization" : "token 59dafcf27ebf9fd433e2bd3f51178a5ea5d7cc91"
    }}).then((response) => {
      let languages={}
      let starsPerRpo={}
      let yearsObject={}
      response.data.map((repo) => {
        axios.get(`https://api.github.com/repos/${this.state.username}/${repo.name}/commits`, {
          headers: {
            "Authorization" : "token 59dafcf27ebf9fd433e2bd3f51178a5ea5d7cc91"
        }}).then((commits) => {  
          commits.data.map((commit) => {
            let date = commit.commit.author.date
            let yearCommit = date.substring(0,4)
            let monthCommit = date.substring(5,7)
            if(yearCommit == todayYear || yearCommit == oneYearAgo) 
            {   
               let objectString = `${months[parseInt(monthCommit)]}  ${yearCommit}`
              // console.log(objectString)
              yearsObject[objectString] ? ++yearsObject[objectString] : yearsObject[objectString] = 1  
            }      
          })
       //   console.log(yearsObject)
       this.setState(prevState => ({
        years: {  ...prevState.years,  ...yearsObject }
      }))    

        if(repo.language !== null)
          languages[repo.language] ? ++languages[repo.language] : languages[repo.language] = 1 
        if(repo.stargazers_count !== null && repo.language !== null)
          starsPerRpo[repo.language] ? starsPerRpo[repo.language] += repo.stargazers_count : starsPerRpo[repo.language] = 1 
      })    
      }).catch((err) => {})  
      
      console.log(yearsObject)
      
  
      //console.log(yearsObject)
      this.setState({languagesPerRepo: languages})
      this.setState({starsPerRpo: starsPerRpo})
    }).catch(err => {})
  }

  render() {
    return (
      <div >
        <Grid container item >
          <Grid item xs={12} sm={12} md={12}>
            <Card elevation={0}>
              <HighChartComponent years={this.state.years} startMonth={this.state.startMonth} startYear = {this.state.startYear} />
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
        </Grid>
      </div>
    )
  }
}