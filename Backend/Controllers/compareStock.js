import NepseStock from "../Models/NEPSEdata.js";

export const compareStock = async (req, res) => {
  const { symbols } = req.query;

  if (!symbols) {
    return res.status(400).json({ message: "symbols query required" });
  }

  const symbolArray = symbols.split(",");

  const stocks = await NepseStock.aggregate([
    {
      $match: {
        symbol: { $in: symbolArray }
      }
    },
    {
      $sort: { date: -1 }
    },
    {
      $group: {
        _id: "$symbol",
        symbol: { $first: "$symbol" },
        ltp: { $first: "$ltp" },
        diffPercent: { $first: "$diffPercent" },
        volume: { $first: "$volume" },
        high52Weeks: { $first: "$high52Weeks" },
        low52Weeks: { $first: "$low52Weeks" }
      }
    },
    {
      $project: {
        _id: 0,
        symbol: 1,
        price: "$ltp",
        changePercent: "$diffPercent",
        volume: 1,
        high52w: "$high52Weeks",
        low52w: "$low52Weeks",
        marketCap: null,
        peRatio: null
      }
    }
  ]);

  res.json({ stocks });
};


export const searchStock = async (req, res) => {
  const { q } = req.query;

  if (!q) return res.json([]);

  const stocks = await NepseStock.aggregate([
    {
      $match: {
        symbol: { $regex: q, $options: "i" }
      }
    },
    {
      $group: {
        _id: "$symbol"
      }
    },
    {
      $project: {
        _id: 0,
        symbol: "$_id"
      }
    },
    {
      $limit: 10
    }
  ]);

  res.json(stocks);
};
