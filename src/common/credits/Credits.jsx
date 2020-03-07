import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
import ProfilePic from "../../resources/images/profile.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "auto",
    marginTop: "15%",
    textAlign: "left"
  },
  media: {
    height: 300
  },
  actions: {
    paddingLeft: 0,
    paddingRight: 0
  },
  networks: {
    width: "100%"
  }
});

const Credits = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={ProfilePic} title="profile" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Gautier DARCHEN
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <List className={classes.networks}>
          <ListItem component="a" button href="https://twitter.com/GDarchen">
            <ListItemAvatar>
              <Avatar>
                <TwitterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="@GDarchen" />
          </ListItem>

          <ListItem component="a" button href="https://github.com/gdarchen">
            <ListItemAvatar>
              <Avatar>
                <GitHubIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="gdarchen" />
          </ListItem>

          <ListItem
            component="a"
            button
            href="https://www.linkedin.com/in/gautierdarchen/"
          >
            <ListItemAvatar>
              <Avatar>
                <LinkedInIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="gautierdarchen" />
          </ListItem>
        </List>
      </CardActions>
    </Card>
  );
};

export default Credits;
