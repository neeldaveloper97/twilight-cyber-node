const { default: axios } = require("axios");
const Employee = require("../model/employee");

exports.employeeDataHandler = async (req, res) => {
  function countStringOccurrences(arr) {
    const countMap = {};
  
    // Iterate through the array
    for (const str of arr) {
      // Check if the string exists in the count map
      if (countMap.hasOwnProperty(str)) {
        // Increment the count if it exists
        countMap[str]++;
      } else {
        // Initialize the count to 1 if it doesn't exist
        countMap[str] = 1;
      }
    }
  
    return countMap;
  }
  const findNonBlankFields = (data) => {
    const nonBlankFields = [];
    if (data?.length > 0) {
      // Iterate through the array of objects
      data.forEach((item, index) => {
        // Iterate through the properties of each object
        for (const key in item) {
          if (item.hasOwnProperty(key)) {
            const value = item[key];
            if (typeof value === "string" && value.trim() !== "") {
              nonBlankFields.push(key);
            }
          }
        }
      });
    }

    const itemsToRemove = ['id', 'email', 'database_name'];
    const newArray = nonBlankFields.filter(item => !itemsToRemove.includes(item));
    const finalArray = countStringOccurrences(newArray)
    return finalArray
  };
  const { emails } = req.body;
  const endpointsArray = emails.map(
    (item) => `${process.env.DEHASHED_API_URL}?query=email:${item.email}`
  );

  axios
    .all(
      endpointsArray.map(
        async (endpoint) =>
          await axios.get(endpoint, {
            headers: {
              Accept: "application/json",
              Authorization: `Basic ${process.env.DEHASHED_TOKEN}`,
            },
          })
      )
    )
    .then((response) => {
      console.log(response);
      response.map((item, index) => {

        if (typeof item.data !== "string") {
          const createEmployeeDetails = new Employee({
            email: emails[index].email,
            result: item.data.entries || [],
            total: item.data.total,
            breaches: findNonBlankFields(item.data.entries||[]),
          });

          if (createEmployeeDetails) {
            createEmployeeDetails.save();
          }
          res.send({ status: 200, message: "Data sent successfully" });
        } else {
          res.send({ status: 400, message: item.data });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};



exports.getAllEntries = async (req,res) => {
    const data = await Employee.find({})
    res.send({status:200,data:data})
}

exports.getEntriesById = async (req,res) => {
    const {id} = req.params
  
    const data = await Employee.findById(id)
    console.log(data)
    res.send({status : 200, data:data})
}
