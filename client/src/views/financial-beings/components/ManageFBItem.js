import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import ManageFBEdit from './ManageFBEdit'

import log from '../../../utils/log'

export const ManageFBItem = ({ classes, team }) => {
  log.debug('ManageFBItem', team, team.fb[0], team.profile.avatar)
  let avatar
  if (team.fb[0].avatar !== undefined && team.fb[0].avatar !== 'a') {
    avatar = team.fb[0].avatar
  } else {
    avatar = 'https://algobotcommstorage.blob.core.windows.net/aateammodule/aa-avatar-default.png'
  }
  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardMedia
            className={classes.cardMedia}
            image={avatar}
            title={team.name}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h5' component='h2'>
              {team.fb[0].name}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              {team.fb[0].kind}
            </Typography>
          </CardContent>
          <CardActions>
            <ManageFBEdit slug={team.slug} fb={team.fb[0]} />
          </CardActions>
        </div>
      </Card>
    </Grid>
  )
}

ManageFBItem.propTypes = {
  classes: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired
}

export default ManageFBItem
