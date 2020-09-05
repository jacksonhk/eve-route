import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import ArrowDropDownCircleTwoToneIcon from '@material-ui/icons/ArrowDropDownCircleTwoTone';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Waypoint } from '../response';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
  },
  listIcon: {
    minWidth: 0,
    marginRight: '15px',
  }
}));

type Props = {
  waypoints: Array<Waypoint>,
  message: string,
  dotlan: string,
}

export default function RouteList(props: Props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
      <List dense={true} className={classes.list}>
        <ListItem>
          <strong>{t('routeList.route')}</strong>
          {props.dotlan &&
            <small style={{marginLeft: "auto"}}>
              <Trans i18nKey="routeList.dotlan">
                %<Link href={props.dotlan} target="_blank" rel="noopener noreferrer">%</Link>%
              </Trans>
            </small>
          }
        </ListItem>
        {props.message &&
          <ListItem>{props.message}</ListItem>
        }
        {props.waypoints.map((value, index) => {
          const last = index + 1 === props.waypoints.length;
          return (
            <ListItem key={index}>
              {! last && value.ansiblexId &&
                <ListItemIcon className={classes.listIcon}><ArrowDropDownCircleTwoToneIcon /></ListItemIcon>
              }
              {! last && ! value.ansiblexId &&
                <ListItemIcon className={classes.listIcon}><ArrowDropDownCircleOutlinedIcon/></ListItemIcon>
              }
              {last &&
                <ListItemIcon className={classes.listIcon}><FiberManualRecordOutlinedIcon /></ListItemIcon>
              }
              <ListItemText
                primary={
                  <React.Fragment>
                    {value.systemName}
                    <Typography component="span" variant="body2" color="textSecondary">
                      <small>{' ' + value.systemSecurity}</small>
                    </Typography>
                  </React.Fragment>
                }
                secondary={<small>{value.ansiblexName}</small>}
              />
            </ListItem>
          )
        })}
      </List>
  )
}
