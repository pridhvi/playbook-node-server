import { getLatestComments } from "../controllers/comments/commentsDao.js";
import { IGDB_API_URL, config } from "./igdbController.js";
import { getLatestRatings } from "./ratings/ratingsDao.js";
import * as usersDao from "../controllers/users/usersDao.js"
import axios from "axios";

const TrendingController = (app) => {
  const getTrendingGames = async (req, res) => {
    const latestComments = await getLatestComments();
    const latestRatings = await getLatestRatings();
    let latestGameIds = [];

    latestComments.map((c) => {
      if (c.itemType === "games") latestGameIds.push(c.itemId);
    });
    latestRatings.map((r) => {
      if (r.itemType === "games") latestGameIds.push(r.itemId);
    });

    const useFilter = (latestGameIds) => {
      return latestGameIds.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    };

    const latestGameIdsUnique = useFilter(latestGameIds);

    Promise.all(
      latestGameIdsUnique.slice(0, 10).map((g) => getGameById(g))
    ).then((latestGames) => res.json(latestGames));
  };

  const getGameById = async (gameId) => {
    const data = `f age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks.url,bundles,category,checksum,collection,cover.url,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots.url,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.video_id,websites.url;where id = ${gameId};`;
    const game = await axios.post(`${IGDB_API_URL}/games`, data, config);
    return game.data;
  };

  const getTrendingUsers = async (req, res) => {
    const latestComments = await getLatestComments();
    const latestRatings = await getLatestRatings();
    let latestUserNames = [];

    latestComments.map((c) => {
      if (c.itemType === "games") latestUserNames.push(c.username);
    });
    latestRatings.map((r) => {
      if (r.itemType === "games") latestUserNames.push(r.username);
    });

    const useFilter = (latestUserNames) => {
      return latestUserNames.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    };

    const latestUserNamesUnique = useFilter(latestUserNames);

    Promise.all(
        latestUserNamesUnique.slice(0, 5).map((u) => findUserByUsername(u))
      ).then((latestUsers) => res.json(latestUsers));
  };

  const findUserByUsername = async (username) => {
    const user = await usersDao.findUserByUsername(username);
    return user;
  };

  app.get("/api/trending/games", getTrendingGames);
  app.get("/api/trending/users", getTrendingUsers);
};

export default TrendingController;
