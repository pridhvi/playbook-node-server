import axios from "axios";

const SEARCH_URL = "https://api.igdb.com/v4/search";

const config = {
  headers: {
    "Client-ID": process.env.CLIENT_ID,
    "Authorization": process.env.ACCESS_TOKEN,
  },
};

const getSearchCriteria = async (req, res) => {
  const data = `search "${req.query.keyword}";
    \nf alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;
    \nl ${req.query.pageSize};
    \no ${req.query.pageNumber};`;

  const games = await axios.post(SEARCH_URL, data, config);
  return res.json(games.data);
};

export default (app) => {
  app.get("/api/igdb/search", getSearchCriteria);
};
