import path from "path";
import fs from "fs";

// FOR BUILD
const dataDir = path.join(process.cwd(), "../data");
// FOR LOCAL
// const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "data.json");

export const createData = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

export const createFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
    console.log("data.json fayli yaratildi");
  } else {
    console.log("data.json fayli allaqachon mavjud");
    const data = fs.readFileSync(path.join(dataDir, "data.json"), "utf-8");
    if (!data) {
      fs.writeFileSync(filePath, JSON.stringify({}));
    }
  }
};

export const loginToFile = async (data) => {
  const jsonString = JSON.stringify(data, null, 2);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log("Data saved successfully"));
      }
    });
  });
};

export const getLoginJson = () => {
  createData();
  createFile();
  return fs.readFileSync(path.join(dataDir, "data.json"), "utf-8");
};
