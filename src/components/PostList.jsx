import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api";
import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  AppBar,
  Toolbar,
  InputBase,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    color: "#333", // Darker text color
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%", // Ensure full width on larger screens
    },
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  return (
    <Container>
      <StyledAppBar position="sticky" color="primary">
        <StyledToolbar>
          <Search>
            <StyledInputBase
              placeholder="Search Posts…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
        </StyledToolbar>
      </StyledAppBar>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredPosts.map((post) => (
            <StyledListItem key={post.id} divider>
              <ListItemText primary={post.title} secondary={post.body} />
            </StyledListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default PostList;
