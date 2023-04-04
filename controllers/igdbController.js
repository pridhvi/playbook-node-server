import axios from "axios";

const IGDB_API_URL = "https://api.igdb.com/v4";

const config = {
  headers: {
    // "Client-ID": process.env.CLIENT_ID,
    // Authorization: process.env.ACCESS_TOKEN
    "Client-ID": "xbkb34auz0iwe92z06zbbsj7xnekr6",
    Authorization: "Bearer 35g8t2249ig2rcv9ee6lyv6e3g626l"
  },
};

const getSearchCriteria = async (req, res) => {
  const data = `search "${req.query.criteria}";
    \nf alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;
    \nw ${req.query.type}!=n;
    \nl ${req.query.pageSize};
    \no ${req.query.pageNumber};`;
  const searchData = await axios.post(`${IGDB_API_URL}/search`, data, config);
  return res.json(searchData.data);
};

const getGameById = async (req, res) => {
  const data = `f age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;where id = ${req.params.id};`;

  const game = await axios.post(`${IGDB_API_URL}/games`, data, config);
  // console.log(req.params.id);
  return res.json(game.data);
};

const getCoverById = async (req, res) => {
  const data = `fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;
  where id = ${req.params.id};`;

  const cover = await axios.post(`${IGDB_API_URL}/covers`, data, config);
//   console.log(cover.data[0].url);
  return res.json(cover.data[0]);
};

const getPlatformById = async (req, res) => {
  const data = `f abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites;where id = ${req.params.id};`;

  const platform = await axios.post(`${IGDB_API_URL}/platforms`, data, config);
  // console.log(req.params.id);
  return res.json(platform.data);
};

const getPlatformLogoById = async (req, res) => {
  const data = `fields alpha_channel,animated,checksum,height,image_id,url,width;
  where id = ${req.params.id};`;

  const platformLogo = await axios.post(`${IGDB_API_URL}/platform_logos`, data, config);
//   console.log(cover.data[0].url);
  return res.json(platformLogo.data[0]);
};

export default (app) => {
  app.get("/api/igdb/search", getSearchCriteria);
  app.get("/api/igdb/games/:id", getGameById);
  app.get("/api/igdb/covers/:id", getCoverById);
  app.get("/api/igdb/platforms/:id", getPlatformById);
  app.get("/api/igdb/platform_logos/:id", getPlatformLogoById);
};
