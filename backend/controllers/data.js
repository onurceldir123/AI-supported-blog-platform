//collection: post
const Data = require("../models/data");

exports.getData = (req, res, next) => {
  const dataQuery = Data.find({}, {prediction:1, GS_1: 1, GS_2:1, TMP_1:1, TMP_2:1, VBR_1:1, _id:0});
  let fetchedData;
  var GS_1_values = [];
  var GS_2_values = [];
  var TMP_1_values = [];
  var TMP_2_values = [];
  var VBR_1_values = [];
  var predictions = [];
  dataQuery
    .then(documents => {
      fetchedData = documents;
      for(var i in fetchedData)
        TMP_1_values.push(fetchedData [i]['TMP_1']);
      for(var i in fetchedData)
        TMP_2_values.push(fetchedData [i]['TMP_2']);
      for(var i in fetchedData)
        GS_1_values.push(fetchedData [i]['GS_1']);
      for(var i in fetchedData)
        GS_2_values.push(fetchedData [i]['GS_2']);
      for(var i in fetchedData)
        VBR_1_values.push(fetchedData [i]['VBR_1']);
      for(var i in fetchedData)
        predictions.push(parseInt(fetchedData [i]['prediction']));
      return Data.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Data fetched successfully!",
        result: {
          TMP_1 : TMP_1_values,
          TMP_2 : TMP_2_values,
          GS_1 : GS_1_values,
          GS_2: GS_1_values,
          VBR_1 : VBR_1_values,
          prediction : predictions,
          fetchedData: count
        }
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching data failed!"
      })
    });
};

exports.getFailData = (req, res, next) => {
  const dataQuery = Data
    .find({prediction:1}, {prediction:1, GS_1: 1, GS_2:1, TMP_1:1, TMP_2:1, VBR_1:1, _id:0, date: 1}).sort({date: -1})
    .limit(10);
  let fetchedData;
  dataQuery
    .then(documents => {
      fetchedData = documents;
      console.log(documents)
      return Data.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Failed Data fetched successfully!",
        result: fetchedData
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching data failed!"
      })
    });
};
