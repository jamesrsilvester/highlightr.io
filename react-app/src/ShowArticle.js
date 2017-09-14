import React, {Component} from 'react'

class SingleArticle extends Component {
  render() {
    return (
      <div className='row grey1'>
        <div className='row container'>
          <div className='col s12 white z-depth-1'>
            <h3 id="articleTitle">Growth Engineer</h3>
            <p>
              To click or not to click, that it is the question: whether ‘tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles.
              <span className="hi">
                Do you wonder at the secret motivations lying behind the ubiquitous website click? Do you long to know the underlying story leading to that moment of decision—the moment of the click? Do you want to craft experiences to make manifest the conclusions of those stories?
              </span>
              Do you want to mess around with colors on landing pages and see which converts better? YOU COULD BE A GROWTH ENGINEER! Are you a fit? We're looking for a full-stack engineer with an interest in understanding human behavior and a ton of initiative. You'll work directly with Honor's head of growth and our design team to improve our website, launch experiments, and grow our revenue.
            </p>
            <ul>Responsibilities:</ul>
            <li>Landing page experiments</li>
            <li>Sign-up flow optimization</li>
            <li>User engagement and retention</li>
            <ul>Requirements:</ul>
            <li>Proficient experience with HTML, CSS, javascript, and python</li>
            <li>Computer Science degree or BS with bootcamp certification Bonus points</li>
            <li>Good understanding of statistics · Experience with Django and Google adwords</li>
          </div>
          <div id="articleSource" className="center-align grey1">
            <p className="grey-text">Source:
              <a href="https://jobs.lever.co/joinhonor.com/a4bda721-e1db-4f4a-81cf-c791a3ad59ad"> joinhonor.com/jobs/growth-engineer</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleArticle
